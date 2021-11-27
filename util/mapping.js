import { mapping } from "@eva-design/eva";

export const customMapping = {
  ...mapping,
  components: {
    Card: {
      appearances: {
        outline: {
          mapping: {
            bodyPaddingHorizontal: -24,
            bodyPaddingVertical: -16,
          },
        },
      },
    },
  },
};
