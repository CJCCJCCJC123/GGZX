import pinia from "@/store";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore(pinia);
const isHasButton = (app: any) => {
  app.directive("has", {
    mounted(el: any, binding: any) {
      console.log(userStore.buttons);
      if (!userStore.buttons.includes(binding.value)) {
        el.parentNode.removeChild(el);
      }
    },
  });
};
export default isHasButton;
