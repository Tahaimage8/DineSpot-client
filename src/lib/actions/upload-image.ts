"use server";

type ImgBBResponse = {
  success?: boolean;
  data?: {
    url?: string;
    display_url?: string;
  };
  error?: {
    message?: string;
  };
};

export type UploadImageResult = {
  success: boolean;
  imageUrl?: string;
  message: string;
};

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const maximumImageSize = 1024 * 1024;

export const uploadImage = async (
  formData: FormData,
): Promise<UploadImageResult> => {
  try {
    const image = formData.get("image");

    if (!(image instanceof File) || image.size === 0) {
      return {
        success: false,
        message: "Please select an image.",
      };
    }

    if (!allowedTypes.includes(image.type)) {
      return {
        success: false,
        message: "Only JPG, PNG and WebP images are allowed.",
      };
    }

    if (image.size > maximumImageSize) {
      return {
        success: false,
        message: "Image size must be less than 1 MB.",
      };
    }

    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        message: "ImgBB API key is missing.",
      };
    }

    const uploadData = new FormData();

    uploadData.append("image", image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        body: uploadData,
        cache: "no-store",
      },
    );

    const result = (await response.json()) as ImgBBResponse;

    const imageUrl =
      result.data?.display_url || result.data?.url;

    if (!response.ok || !result.success || !imageUrl) {
      return {
        success: false,
        message:
          result.error?.message ||
          "Image upload failed. Please try again.",
      };
    }

    return {
      success: true,
      imageUrl,
      message: "Image uploaded successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while uploading the image.",
    };
  }
};