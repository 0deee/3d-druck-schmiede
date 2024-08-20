<template>
  <div class="p-8 bg-white rounded-lg shadow-md">
    <form @submit.prevent="handleSubmit">
      <!--Honeypot Field-->
      <div class="hidden">
        <label for="website">Feld Check:</label>
        <input
          v-model="form.honeypot"
          type="text"
          id="website"
          name="website"
        />
      </div>
      <div class="mb-4">
        <label for="firmenname" class="block text-black font-medium mb-2"
          >Firmenname</label
        >
        <input
          v-model="form.firmenname"
          type="text"
          id="firmenname"
          class="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div class="flex flex-row gap-6">
        <div class="mb-4">
          <label
            for="vorname"
            class="block text-black font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red"
            >Vorname</label
          >
          <input
            v-model="form.vorname"
            type="text"
            id="vorname"
            class="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div class="mb-4">
          <label
            for="nachname"
            class="block text-black font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red"
            >Nachname</label
          >
          <input
            v-model="form.nachname"
            type="text"
            id="nachname"
            class="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div class="mb-2">
        <label
          for="email"
          class="block text-black font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red"
          >E-Mail-Adresse</label
        >
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="peer w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <p
          class="mt-2 text-red text-sm peer-invalid:peer-focus:visible peer-invalid:peer-focus:visible invisible"
        >
          Bitte geben Sie eine gültige E-Mail Adresse an.
        </p>
      </div>

      <div class="mb-2">
        <label
          for="telefonnummer"
          class="block text-black font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red"
          >Telefonnummer</label
        >
        <input
          v-model="form.telefonnummer"
          type="tel"
          id="telefonnummer"
          pattern="[0-9]*"
          class="peer w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <p
          class="mt-2 text-red text-sm peer-invalid:peer-focus:visible peer-invalid:peer-focus:visible invisible"
        >
          Bitte geben Sie eine gültige Telefonnummer an.
        </p>
      </div>

      <div class="mb-4">
        <label
          for="betreff"
          class="block text-black font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red"
          >Betreff</label
        >
        <input
          v-model="form.betreff"
          type="text"
          id="betreff"
          class="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label
          for="nachricht"
          class="block text-black font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red"
          >Nachricht</label
        >
        <textarea
          v-model="form.nachricht"
          id="nachricht"
          rows="4"
          class="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        ></textarea>
      </div>
      <div class="mb-6">
        <p class="text-sm">
          Alle mit * gekennzeichneten Felder sind Pflichtfelder
        </p>
      </div>
      <div class="flex flex-row items-center justify-between space-x-4"></div>
      <!-- reCAPTCHA Widget -->
      <div class="mb-4">
        <div
          class="g-recaptcha"
          :data-sitekey="siteKey"
          data-size="compact"
        ></div>
      </div>
      <!--Form Button-->
      <div class="relative">
        <button
          type="submit"
          :disabled="isSubmitting || isHoneypotFilled"
          :class="
            isSubmitting || isHoneypotFilled
              ? 'bg-primary-lighter cursor-not-allowed'
              : 'bg-primary'
          "
          class="w-full text-white font-semibold py-2.5 px-3.5 rounded-md shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/80 transition duration-300 transform active:scale-95"
        >
          <span v-if="!isSubmitting">Absenden</span>
          <span v-if="isSubmitting" class="flex items-center justify-center">
            <svg
              class="animate-spin h-5 w-5 text-white mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Bitte warten
          </span>
        </button>
        <!--Error Messages-->
        <p v-if="isSubmitted" class="text-green text-center mt-4">
          Nachricht erfolgreich gesendet!
        </p>
        <p v-if="isFalseRecaptcha" class="text-red text-center mt-4">
          Ungültiges reCAPTCHA!
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firmenname: "",
        vorname: "",
        nachname: "",
        email: "",
        telefonnummer: "",
        betreff: "",
        nachricht: "",
        honeypot: "",
      },
      isSubmitting: false,
      isSubmitted: false,
      isHoneypotFilled: false,
      isRecaptchaVerified: false,
      isFalseRecaptcha: false,
      siteKey: process.env.RECAPTCHA_SITE_KEY || "", // netlify env variable
    };
  },
  methods: {
    async handleSubmit() {
      // honeypot check
      if (this.form.honeypot) {
        console.log("Bot detected!");
        this.isHoneypotFilled = true;
        return;
      }

      // reCAPTCHA check
      const recaptchaToken = document.querySelector(
        `[name="g-recaptcha-response"]`
      ).value;

      if (!recaptchaToken) {
        console.log("reCAPTCHA verification failed.");
        this.isFalseRecaptcha = true;
        setTimeout(() => {
          this.isFalseRecaptcha = false;
        }, 3000); // remove reCAPTCHA msg after 3 seconds
        return;
      } else {
        this.isRecaptchaVerified = true;
      }

      this.isSubmitting = true;

      // simulate sending data
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

      this.isSubmitting = false;
      this.isSubmitted = true;

      console.log("Form data:", this.form);

      // reset form after submission
      this.resetForm();
    },
    resetForm() {
      this.form = {
        firmenname: "",
        vorname: "",
        nachname: "",
        email: "",
        telefonnummer: "",
        betreff: "",
        nachricht: "",
      };
      // reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
      setTimeout(() => {
        this.isSubmitted = false;
      }, 3000); // remove success msg after 3 seconds
    },
  },
  mounted() {
    // load the reCAPTCHA script dynamically
    // only while using this component
    const recaptchaScript = document.createElement("script");
    recaptchaScript.src = `https://www.google.com/recaptcha/api.js`;
    recaptchaScript.async = true;
    recaptchaScript.defer = true;
    document.head.appendChild(recaptchaScript);
  },
};
</script>
