<template>
  <section class="relative mx-4 md:mx-24 lg:mx-48">
    <div class="pt-12 text-center">
      <h2 class="text-5xl px-6 text-black font-bold hyphens-auto">
        Kundenprojekte in höchster Qualität
      </h2>
      <p class="text-lg mb-8 text-black pt-4">
        Entdecken Sie die Vielfalt unserer maßgeschneiderten 3D-Drucklösungen –
        von hochpräzisen Komponenten bis hin zu innovativen Gehäusen, die in
        verschiedenen Branchen zum Einsatz kommen.
      </p>
    </div>
    <!-- Carousel Container -->
    <div class="relative">
      <!-- Left Arrow -->
      <button
        class="absolute -left-4 md:-left-4 lg:-left-16 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-opacity-75 text-white z-10"
        @click="prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-white lg:fill-primary w-24"
        >
          <title>Gehe nach links im Portfolio-Bilder-Karussell</title>
          <path
            d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
          />
        </svg>
      </button>

      <!-- Right Arrow -->
      <button
        class="absolute -right-4 md:-right-4 lg:-right-16 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-opacity-75 text-white z-10"
        @click="next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-white lg:fill-primary w-24"
        >
          <title>Gehe nach rechts im Portfolio-Bilder-Karussell</title>
          <path
            d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          />
        </svg>
      </button>

      <!-- Carousel Images -->
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{
            transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
          }"
        >
          <div
            v-for="(image, index) in portfolioImages"
            :key="index"
            :class="{
              'flex-none w-full p-2': itemsToShow === 1,
              'flex-none w-1/2 p-2': itemsToShow === 2,
              'flex-none w-1/3 p-2': itemsToShow === 3,
            }"
          >
            <img
              :src="image.data.caseStudyImage.src"
              :alt="image.data.caseStudyImageAlt"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div class="bottom-0 left-0 right-0 flex justify-center my-6">
        <span
          v-for="(dot, index) in Math.ceil(
            portfolioImages.length / itemsToShow
          )"
          :key="index"
          class="mx-1 h-3 w-3 rounded-full cursor-pointer"
          :class="{
            'bg-primary': Math.floor(currentIndex / itemsToShow) === index,
            'bg-primary-lighter':
              Math.floor(currentIndex / itemsToShow) !== index,
          }"
          @click="goTo(index)"
        ></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    portfolioImages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      itemsToShow: 3, // default image number in grid
    };
  },
  computed: {
    maxIndex() {
      return this.portfolioImages.length - this.itemsToShow;
    },
  },
  methods: {
    next() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0; // wraps around to the beginning
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.maxIndex; // wraps around to end
      }
    },
    goTo(index) {
      this.currentIndex = index * this.itemsToShow;
    },
    updateItemsToShow() {
      if (window.innerWidth < 640) {
        this.itemsToShow = 1; // 1 item on small screens
      } else if (window.innerWidth < 1280) {
        this.itemsToShow = 2; // 2 items on medium screens
      } else {
        this.itemsToShow = 3; // default 3 items on large screens
      }
    },
  },
  mounted() {
    this.updateItemsToShow(); // set initial itemsToShow based on screen size
    window.addEventListener("resize", this.updateItemsToShow); // update on resize
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateItemsToShow);
  },
};
</script>
