<template>
  <section class="relative mx-4 md:mx-24 xl:mx-48">
    <div class="pt-12 text-center">
      <h2 class="text-5xl px-6 text-black font-bold break-words">
        Aktuelles aus der Welt des 3D-Drucks
      </h2>
      <p class="text-lg mb-8 text-black pt-4">
        Bleiben Sie informiert mit unseren neuesten Blog-Artikeln zu Trends,
        Innovationen und Tipps rund um die 3D-Druck-Technologie.
      </p>
    </div>
    <!-- Carousel Container -->
    <div class="relative">
      <!-- Left Arrow -->
      <button
        class="hidden md:block absolute -left-16 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-opacity-75 text-white z-10"
        @click="prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-primary w-24"
        >
          <title>Gehe nach links im Blog-Artikel-Karussell</title>
          <path
            d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
          />
        </svg>
      </button>

      <!-- Right Arrow -->
      <button
        class="hidden md:block absolute -right-16 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-opacity-75 text-white z-10"
        @click="next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-primary w-24"
        >
          <title>Gehe nach rechts im Blog-Artikel-Karussell</title>
          <path
            d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
          />
        </svg>
      </button>

      <!-- Carousel Cards -->
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          :style="{
            transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
          }"
        >
          <div
            v-for="(blog, index) in latestBlogPosts"
            :key="index"
            :class="{
              'flex-none w-full p-2': itemsToShow === 1,
              'flex-none w-1/2 p-2': itemsToShow === 2,
              'flex-none w-1/3 p-2': itemsToShow === 3,
            }"
          >
            <a :href="`/blog/${blog.slug}`">
              <div class="m-2 border-2 border-background h-full">
                <img
                  :src="blog.data.heroImage.src"
                  :alt="blog.data.heroImageAlt"
                  class="w-full h-84 lg:h-96 object-cover"
                />
                <h3
                  class="mt-2 text-lg md:text-xl text-left font-semibold p-2"
                >
                  {{ blog.data.title }}
                </h3>
                <div class="flex flex-row items-center text-sm md:text-sm mx-2">
                  <div>
                    <svg
                      class="inline-block fill-white w-4 md:w-6 rounded-full bg-primary-light p-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>account icon</title>
                      <path
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                      />
                    </svg>
                  </div>
                  <p class="mx-2">{{ blog.data.author }}</p>
                  <div
                    class="bg-primary-lighter rounded-full h-0.5 md:h-1 w-0.5 md:w-1 aria-hidden"
                  />
                  <div class="px-2">
                    <time :datetime="blog.data.pubDate.toISOString()">
                      {{
                        blog.data.pubDate.toLocaleDateString("de-DE", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      }}
                    </time>
                  </div>
                </div>

                <p class="p-2">
                  {{
                    blog.body
                      .replace(textBodyRegex, "")
                      .normalize("NFKD")
                      .slice(0, 250)
                  }}...
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div class="bottom-0 left-0 right-0 flex justify-center my-6">
        <span
          v-for="(dot, index) in Math.ceil(
            latestBlogPosts.length / itemsToShow
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
    latestBlogPosts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      itemsToShow: 3, // default image number in grid
      textBodyRegex: /#+/g,
    };
  },
  computed: {
    maxIndex() {
      return this.latestBlogPosts.length - this.itemsToShow;
    },
  },
  methods: {
    next() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex += this.itemsToShow;
      } else {
        this.currentIndex = 0; // wraps around to the beginning
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex -= this.itemsToShow;
      } else {
        this.currentIndex = this.maxIndex; // wraps around to the end
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
    this.updateItemsToShow(); // Set initial itemsToShow based on screen size
    window.addEventListener("resize", this.updateItemsToShow); // update on resize
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateItemsToShow);
  },
};
</script>
