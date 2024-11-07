import axios, { AxiosResponse, AxiosError, Method, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "base url",
});

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      (config.headers as Record<string, string>).TimeZone = timezone;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.success && response.data?.data) {
      response.data = response.data.data;
    }
    return response;
  },
  async (error: AxiosError) => Promise.reject(error)
);

interface RequestOptions {
  url: string;
  attributes?: Record<string, any> | null;
  method?: Method;
  success?: (response: AxiosResponse) => void;
  fail?: (error: AxiosError) => void;
}

export const request = async ({ url, attributes = null, method = "get", success = () => {}, fail = () => {} }: RequestOptions): Promise<void> => {
  try {
    let response: AxiosResponse;

    switch (method) {
      case "patch":
        response = await api.patch(url, attributes);
        break;
      case "put":
        response = await api.put(url, attributes);
        break;
      case "delete":
        response = await api.delete(url, { data: attributes });
        break;
      case "post":
        response = await api.post(url, attributes);
        break;
      default:
        response = await api.get(url);
        break;
    }

    success(response);
  } catch (error) {
    const axiosError = error as AxiosError;
    fail(axiosError);
  }
};

interface ErrorResponse {
  response?: {
    data?: {
      errors?: { errorMsg: string }[];
      error?: string;
    };
  };
  message?: string;
}

export const handleError = (error: ErrorResponse): void => {
  const errorMessages = error?.response?.data?.errors;
  if (errorMessages) {
    console.log(errorMessages);

    // Swal.fire({
    //   icon: "error",
    //   title: "Error List",
    //   html: errorMessages.reduce((acc, err, index) => `${acc} <p style="margin: 0 0 10px 20px; display: flex">${index + 1}) ${err.errorMsg}</p>`, ""),
    // });
  } else {
    console.log(errorMessages);
    // Swal.fire({
    //   icon: "error",
    //   title: "Error",
    //   text: error?.response?.data?.error || error.message || "An unknown error occurred.",
    // });
  }
};
