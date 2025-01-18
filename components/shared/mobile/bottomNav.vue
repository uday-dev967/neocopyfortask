<template>
  <div class="bottom-nav">
      <div>
         <nuxt-link
          :to="localePath('/dashboard_mobile/projects')"
          class=""
         >
          <svg  :class="$route.name=='dashboard_mobile-projects'?'active-link':''" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.61377 5.8894V17.2507H15.6054V8.71293H7.06755L4.9163 5.8894H1.35327H0.61377Z" stroke="#D1D1D1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.42871 5.4188V1.25073H14.5296V7.50283V8.71292" stroke="#D1D1D1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>{{ $t("buttonText.projects") }}</p>
         </nuxt-link>
      </div>
      <div>
         <nuxt-link
          :to="localePath('/dashboard_mobile/home')"
          class=""
         >
          <svg :class="$route.name=='dashboard_mobile-home'?'active-link':''" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.13889 17.8947H1.03188C0.976656 17.8947 0.931885 17.8499 0.931885 17.7947V7.49212C0.931885 7.46131 0.946087 7.43222 0.970381 7.41327L8.99282 1.15572C9.02917 1.12737 9.08018 1.12754 9.11634 1.15612L17.0313 7.41327C17.0552 7.43223 17.0692 7.46113 17.0692 7.49172V17.7947C17.0692 17.8499 17.0245 17.8947 16.9692 17.8947H11.5916C11.5364 17.8947 11.4916 17.8499 11.4916 17.7947V12.3628C11.4916 12.3076 11.4468 12.2628 11.3916 12.2628H6.33889C6.28366 12.2628 6.23889 12.3076 6.23889 12.3628V17.7947C6.23889 17.8499 6.19412 17.8947 6.13889 17.8947Z" stroke="#D1D1D1" stroke-width="1.2"/>
          </svg>
          <p>{{ $t("buttonText.home") }}</p>
         </nuxt-link>
      </div>
      <div>
        <nuxt-link
          :to="localePath('/dashboard_mobile/gallery')"
          class=""
         >
        <svg :class="$route.name=='dashboard_mobile-gallery'?'active-link':''" width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.10449 3.13958H4.18855V1.11054H20.0282V12.7141H18.1151V13.7162H21.1144V0.112061H3.10449V3.13958Z" fill="#D1D1D1"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.31226 2.50146C1.03611 2.50146 0.812256 2.72532 0.812256 3.00146V15.612C0.812256 15.8882 1.03611 16.112 1.31226 16.112H18.3206C18.5968 16.112 18.8206 15.8882 18.8206 15.612V3.00146C18.8206 2.72532 18.5968 2.50146 18.3206 2.50146H1.31226ZM17.7377 3.50141H1.89489V15.1124H17.7377V3.50141Z" fill="#D1D1D1"/>
        <path d="M5.31831 8.14624L1.55908 11.8031V12.8669L5.31831 9.2509L10.3197 13.9449L13.251 12.1208L18.0701 15.3546V14.313L13.251 11.0385L10.3197 12.8669L5.31831 8.14624Z" fill="#D1D1D1"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8209 9.30687C14.0641 9.30687 15.0719 8.29126 15.0719 7.03845C15.0719 5.78563 14.0641 4.77002 12.8209 4.77002C11.5777 4.77002 10.5698 5.78563 10.5698 7.03845C10.5698 8.29126 11.5777 9.30687 12.8209 9.30687ZM12.821 8.55087C13.6498 8.55087 14.3217 7.8738 14.3217 7.03858C14.3217 6.20337 13.6498 5.5263 12.821 5.5263C11.9921 5.5263 11.3203 6.20337 11.3203 7.03858C11.3203 7.8738 11.9921 8.55087 12.821 8.55087Z" fill="#D1D1D1"/>
        </svg>
        <p>{{ $t("buttonText.gallery") }}</p>
        </nuxt-link>
      </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
  .bottom-nav {
    height: 7.5vh;
    background: #201F20;
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    padding: 0.8rem 0;
    position: fixed;
    width: 100%;
    bottom: 0;
    div {
      display: grid;
      justify-items: center;
      row-gap: 0.5rem;
      a {
        text-decoration: none;
        text-align: center;
      }
  }
    p {
      margin: 0;
      font-style: normal;
      font-weight: 500;
      font-size: 0.9rem;
      line-height: 0.8125rem;
      color: #D1D1D1;
    }
  }
   .active-link {
        path{
          stroke: #E9BEB3;
        }
    }
</style>
