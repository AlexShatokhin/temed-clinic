export function initVideoPlayer() {
    // Функция для остановки всех видео
    function stopAllVideos() {
        // Останавливаем все кастомные плееры
        document.querySelectorAll('.video__custom-player.playing').forEach(player => {
            const iframe = player.querySelector('.video__embedded-player');
            const preview = player.querySelector('.video__preview');
            
            if (iframe) {
                iframe.src = '';
                iframe.classList.remove('active');
            }
            if (preview) {
                preview.style.display = 'block';
            }
            player.classList.remove('playing');
        });
        
        // Останавливаем все HTML5 видео
        document.querySelectorAll('video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }


    // Инициализация кастомного видео плеера с превью
    function initCustomPlayer(container, videoUrl, previewImage, className = '') {
        const playerHTML = `
            <div class="video__custom-player ${className}" data-video-url="${videoUrl}">
                <div class="video__preview" style="background-image: url('${previewImage}')">
                    <div class="video__play-button"></div>
                </div>
                <iframe class="video__embedded-player" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
        
        container.innerHTML = playerHTML;
        
        const player = container.querySelector('.video__custom-player');
        const playButton = container.querySelector('.video__play-button');
        const preview = container.querySelector('.video__preview');
        const iframe = container.querySelector('.video__embedded-player');
        
        // Обработчик клика по превью
        const playVideo = () => {
            // Останавливаем все другие видео перед запуском нового
            stopAllVideos();
            
            player.classList.add('playing');
            iframe.src = videoUrl;
            
            preview.style.display = 'none';
            iframe.classList.add('active');
        };
        
        playButton.addEventListener('click', playVideo);
        preview.addEventListener('click', playVideo);
    }
    
    // Автоинициализация для элементов с data-атрибутами
    function autoInit() {
        // Инициализация кастомных плееров
        document.querySelectorAll('[data-video-custom]').forEach(element => {
            const videoUrl = element.dataset.videoUrl;
            const previewImage = element.dataset.previewImage;
            const className = element.dataset.className || '';
            
            if (videoUrl && previewImage) {
                initCustomPlayer(element, videoUrl, previewImage, className);
            }
        });
        
        // Инициализация YouTube embeds
        document.querySelectorAll('[data-video-youtube]').forEach(element => {
            const videoUrl = element.dataset.videoUrl;
            if (videoUrl) {
                createYouTubeEmbed(element, videoUrl);
            }
        });
        
        // Инициализация HTML5 видео
        document.querySelectorAll('[data-video-html5]').forEach(element => {
            const videoUrl = element.dataset.videoUrl;
            const posterUrl = element.dataset.posterUrl;
            const options = {
                controls: element.dataset.controls !== 'false',
                autoplay: element.dataset.autoplay === 'true',
                muted: element.dataset.muted === 'true',
                loop: element.dataset.loop === 'true'
            };
            
            if (videoUrl) {
                createHTML5Video(element, videoUrl, posterUrl, options);
                
                // Добавляем обработчик для остановки других видео при запуске HTML5 видео
                const video = element.querySelector('video');
                if (video) {
                    video.addEventListener('play', () => {
                        stopAllVideos();
                        // Возобновляем воспроизведение текущего видео
                        setTimeout(() => {
                            if (video.paused) {
                                video.play();
                            }
                        }, 10);
                    });
                }
            }
        });
        

    }
    
    return {
        initCustomPlayer,
        autoInit,
        stopAllVideos
    };
}
