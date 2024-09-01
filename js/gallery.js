
// // Клас ImageItem відповідає за створення окремих зображень галереї
// class ImageItem {
//   constructor({ preview, original, description }) {
//     // Зберігає прев'ю, оригінал і опис зображення
//     this.preview = preview;
//     this.original = original;
//     this.description = description;
//   }

//   // Метод створює HTML-розмітку для одного зображення галереї
//   createMarkup() {
//     return `
//       <li class="gallery-item">
//         <img
//           class="gallery-image"
//           src="${this.preview}"
//           data-source="${this.original}"
//           alt="${this.description}"
//         />
//       </li>
//     `;
//   }
// }

// // Клас Gallery відповідає за управління всією галереєю зображень
// class Gallery {
//   constructor(images, containerSelector) {
//     // Створює об'єкти ImageItem для кожного зображення і зберігає їх в масиві
//     this.images = images.map(image => new ImageItem(image));
//     // Визначає контейнер галереї в DOM
//     this.container = document.querySelector(containerSelector);
//     // Створює об'єкт слайдера для показу зображень
//     this.slider = new Slider(this.images);
//   }

//   // Метод рендерить всі зображення галереї в контейнер
//   render() {
//     this.container.innerHTML = this.images.map(image => image.createMarkup()).join("");
//     // Додає обробник подій для кліків на зображеннях галереї
//     this.container.addEventListener("click", this.handleImageClick.bind(this));
//   }

//   // Метод обробляє кліки на зображеннях, відкриваючи їх в слайдері
//   handleImageClick(event) {
//     const { target } = event; // Деструктуризація для зручності
//     if (target.nodeName === "IMG") {
//       // Знаходимо індекс зображення, на яке було натиснуто
//       const index = this.images.findIndex(img => img.original === target.dataset.source);
//       this.slider.show(index); // Відкриваємо слайдер з відповідним зображенням
//     }
//   }

//   // Метод ініціалізує галерею, рендерячи зображення
//   init() {
//     this.render();
//   }
// }

// // Клас Slider відповідає за показ зображень у повноекранному режимі з можливістю навігації
// class Slider {
//   constructor(images) {
//     this.images = images; // Масив зображень для показу в слайдері
//     this.sliderElement = document.querySelector(".slider"); // Елемент слайдера в DOM
//     this.sliderDots = this.sliderElement.querySelector(".slider-dots"); // Контейнер для точок навігації
//     this.slideIndex = 0; // Поточний індекс слайда

//     // Додаємо обробники подій на кнопки "Назад" і "Вперед"
//     this.sliderElement.querySelector(".prev-button").onclick = () =>
//       this.showSlide(this.slideIndex - 1);
//     this.sliderElement.querySelector(".next-button").onclick = () =>
//       this.showSlide(this.slideIndex + 1);
//     // Обробка натискання клавіш для перемикання слайдів і закриття слайдера
//     document.onkeydown = this.handleKeyDown.bind(this);

//     this.createDots(); // Створюємо точки навігації
//     this.createCloseButton(); // Створюємо кнопку закриття
//   }

//   // Метод створює точки навігації для кожного слайда
//   createDots() {
//     this.sliderDots.innerHTML = this.images
//       .map((_, i) => `<span class="slider-dot" data-index="${i}"></span>`)
//       .join("");
//     this.dots = [...this.sliderDots.children]; // Зберігає всі точки навігації
//     // Додає обробники подій для кожної точки
//     this.dots.forEach(
//       (dot) => (dot.onclick = () => this.showSlide(+dot.dataset.index))
//     );
//   }

//   // Метод створює кнопку закриття слайдера і додає її в DOM
//   createCloseButton() {
//     const closeButton = document.createElement("button");
//     closeButton.textContent = "✕"; // Текст для кнопки закриття
//     // Застосовуємо стилі для кнопки закриття
//     Object.assign(closeButton.style, {
//       position: "absolute",
//       top: "20px",
//       right: "20px",
//       background: "rgba(0, 0, 0, 0.5)",
//       color: "white",
//       border: "none",
//       padding: "10px",
//       cursor: "pointer",
//     });
//     // Додаємо кнопку до слайдера
//     closeButton.onclick = () => (this.sliderElement.style.display = "none");
//     this.sliderElement.appendChild(closeButton);
//   }// Метод обробляє натискання клавіш (стрілки та Escape)
//   handleKeyDown(event) {
//     if (event.key === "ArrowLeft") this.showSlide(this.slideIndex - 1);
//     else if (event.key === "ArrowRight") this.showSlide(this.slideIndex + 1);
//     else if (event.key === "Escape") this.sliderElement.style.display = "none"; // Закриття слайдера при натисканні Escape
//   }

//   // Метод показує конкретний слайд за індексом
//   showSlide(index) {
//     this.slideIndex = (index + this.images.length) % this.images.length; // Циклічне обчислення індексу слайда
//     const img =
//       this.sliderElement.querySelector("img") || document.createElement("img");
//     img.src = this.images[this.slideIndex].original; // Оновлюємо джерело зображення
//     if (!img.parentElement)
//       this.sliderElement.insertBefore(img, this.sliderDots);
//     // Оновлюємо стан точок навігації
//     this.dots.forEach((dot) =>
//       dot.classList.toggle("active", +dot.dataset.index === this.slideIndex)
//     );
//     this.sliderElement.style.display = "flex"; // Відображаємо слайдер
//   }

//   // Метод для відкриття слайдера з певним зображенням
//   show(index) {
//     this.showSlide(index);
//   }
// }

// // Масив даних зображень для галереї
// const imagesData = [
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
//     description: "Hokkaido Flower",
//   },
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
//     description: "Container Haulage Freight",
//   },
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
//     description: "Aerial Beach View",
//   },
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
//     description: "Flower Blooms",
//   },
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
//     description: "Alpine Mountains",
//   },
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
//     description: "Mountain Lake Sailing",
//   },
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
//     description: "Alpine Spring Meadows",
//   },
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
//     description: "Nature Landscape",
//   },
//   {
//     preview:
//       "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
//     original:
//       "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
//     description: "Lighthouse Coast Sea",
//   },
// ];

// // Ініціалізація галереї з переданими даними і контейнером
// const gallery = new Gallery(imagesData, ".gallery");
// gallery.init();


// Стилі для галереї
// .gallery {
//     list-style: none;
//     display: flex;
//     flex-wrap: wrap;
//     gap: 16px;
//     padding: 0;
//     margin: 0;
// }

// .gallery-item {
//     flex-basis: calc((100% - 32px) / 3);
//     /* 3 items per row with 16px gap on both sides */
//     box-sizing: border-box;
// }

// .gallery-link {
//     display: block;
//     width: 100%;
//     height: 100%;
// }

// .gallery-image {
//     display: block;
//     width: 100%;
//     height: auto;
//     border-radius: 4px;
//     object-fit: cover;
//     transition: transform 0.3s, box-shadow 0.3s;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// }

// .gallery-image:hover {
//     transform: scale(1.05);
//     box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
// }

// /* Стилі для слайдера */
// .slider {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.8);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
// }

// .slider img {
//     max-width: 80%;
//     max-height: 80%;
//     border-radius: 8px;
//     box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
// }

// .prev-button,
// .next-button {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     background: rgba(255, 255, 255, 0.3);
//     border: none;
//     padding: 16px;
//     cursor: pointer;
//     font-size: 24px;
//     color: white;
//     border-radius: 50%;
//     z-index: 1001;
//     transition: background 0.3s;
// }

// .prev-button {
//     left: 16px;
// }

// .next-button {
//     right: 16px;
// }

// .prev-button:hover,
// .next-button:hover {
//     background: rgba(255, 255, 255, 0.5);
// }

// .slider-dots {
//     position: absolute;
//     bottom: 20px;
//     display: flex;
//     justify-content: center;
//     width: 100%;
//     gap: 8px;
//     z-index: 1001;
// }

// .slider-dot {
//     width: 12px;
//     height: 12px;
//     background-color: white;
//     border-radius: 50%;
//     cursor: pointer;
//     transition: background-color 0.3s;
// }

// .slider-dot.active {
//     background-color: red;
// }

// .slider-dot:hover {
//     background-color: gray;
// }

// button[data-action="close"] {
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     background: rgba(0, 0, 0, 0.5);
//     color: white;
//     border: none;
//     padding: 10px;
//     cursor: pointer;
//     font-size: 24px;
//     border-radius: 50%;
//     z-index: 1001;
//     transition: background 0.3s;
// }

// button[data-action="close"]:hover {
//     background: rgba(0, 0, 0, 0.7);
// }

// ----------------------------------------------------------------


document.addEventListener("DOMContentLoaded", () => {
  // Бургер-меню
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Закриття меню при виборі пункту
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Клас ImageItem відповідає за створення окремих зображень галереї
  class ImageItem {
    constructor({ preview, original, description }) {
      this.preview = preview;
      this.original = original;
      this.description = description;
    }

    // Метод створює HTML-розмітку для одного зображення галереї
    createMarkup = () => `
          <li class="gallery-item">
            <img
              class="gallery-image"
              src="${this.preview}"
              data-source="${this.original}"
              alt="${this.description}"
            />
          </li>
        `;
  }

  // Клас Gallery відповідає за управління всією галереєю зображень
  class Gallery {
    constructor(images, containerSelector) {
      this.images = images.map((image) => new ImageItem(image));
      this.container = document.querySelector(containerSelector);
      this.slider = new Slider(this.images);
    }

    render = () => {
      this.container.innerHTML = this.images
        .map((image) => image.createMarkup())
        .join("");
      this.container.addEventListener("click", this.handleEvent);
    };

    handleEvent = ({ target }) => {
      if (target.classList.contains("gallery-image")) {
        const index = this.images.findIndex(
          (img) => img.original === target.dataset.source
        );
        this.slider.show(index);
      }
    };

    init = () => {
      this.render();
    };
  }

  // Клас Slider відповідає за показ зображень у повноекранному режимі з можливістю навігації
  class Slider {
    constructor(images) {
      this.images = images;
      this.sliderElement = document.querySelector(".slider");
      this.sliderDots = this.sliderElement.querySelector(".slider-dots");
      this.slideIndex = 0;

      this.sliderElement.addEventListener("click", this.handleEvent);
      document.addEventListener("keydown", this.handleKeyDown);

      this.createDots();
      this.createCloseButton();
    }

    createDots = () => {
      this.sliderDots.innerHTML = this.images
        .map((_, i) => `<span class="slider-dot" data-index="${i}"></span>`)
        .join("");
      this.dots = [...this.sliderDots.children];
    };

    createCloseButton = () => {
      const closeButton = document.createElement("button");
      closeButton.textContent = "✕";
      Object.assign(closeButton.style, {
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "rgba(0, 0, 0, 0.5)",
        color: "white",
        border: "none",
        padding: "10px",
        cursor: "pointer",
      });
      closeButton.dataset.action = "close";
      this.sliderElement.appendChild(closeButton);
    };

    handleEvent = ({ target }) => {
      const actionMap = {
        "prev-button": () => this.showSlide(this.slideIndex - 1),
        "next-button": () => this.showSlide(this.slideIndex + 1),
        "slider-dot": () => this.showSlide(+target.dataset.index),
        close: () => this.hideSlider(),
      };

      const action = Object.keys(actionMap).find(
        (key) => target.classList.contains(key) || target.dataset.action === key
      );
      if (action) actionMap[action]();
    };

    handleKeyDown = ({ key }) => {
      const keyMap = {
        ArrowLeft: () => this.showSlide(this.slideIndex - 1),
        ArrowRight: () => this.showSlide(this.slideIndex + 1),
        Escape: () => this.hideSlider(),
      };

      if (keyMap[key]) keyMap[key]();
    };

    showSlide = (index) => {
      this.slideIndex = (index + this.images.length) % this.images.length;
      let img = this.sliderElement.querySelector("img");

      if (!img) {
        img = document.createElement("img");
        this.sliderElement.insertBefore(img, this.sliderDots);
      }

      img.src = this.images[this.slideIndex].original;
      img.classList.remove("opened");

      setTimeout(() => {
        img.classList.add("opened");
      }, 10);

      this.dots.forEach((dot) =>
        dot.classList.toggle("active", +dot.dataset.index === this.slideIndex)
      );

      this.sliderElement.style.display = "flex";
    };

    hideSlider = () => {
      const img = this.sliderElement.querySelector("img");
      if (img) {
        img.classList.remove("opened");
      }
      this.sliderElement.style.display = "none";
    };

    show = (index) => {
      this.showSlide(index);
    };
  }

  // Масив даних зображень для галереї
  const imagesData = [
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg",
      description: "Hokkaido Flower",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
      description: "Container Haulage Freight",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
      description: "Aerial Beach View",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
      description: "Flower Blooms",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
      description: "Alpine Mountains",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
      description: "Mountain Lake Sailing",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
      description: "Alpine Spring Meadows",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
      description: "Nature Landscape",
    },
    {
      preview:
        "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
      original:
        "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
      description: "Lighthouse Coast Sea",
    },
  ];

  // Ініціалізація галереї з переданими даними і контейнером
  const gallery = new Gallery(imagesData, ".gallery");
  gallery.init();
});