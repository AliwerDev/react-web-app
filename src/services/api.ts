import axios, { AxiosResponse, AxiosError, Method, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  // baseURL: "http://212.56.43.170/api/v1",
  baseURL: "https://dev.sirojiddinsaidov.uz/api/v1",
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // if (config.headers) {
    //   (config.headers as Record<string, string>).Hash = "047bbb5fbc3b13d7dad777a75134e22029cfbf4c0b53bc8a443a358bd6177386";
    //   (config.headers as Record<string, string>).DataCheckString = `auth_date=1731233043:chat_instance=-1318221339829770145:chat_type=sender:user={"id":1189809266,"first_name":"Dilshod","last_name":"Latipov","username":"dilshodlatipov","language_code":"en","allows_write_to_pm":true}`;
    // }
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
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.open("/404", "_self");
    }
    return Promise.reject(error);
  }
);

interface RequestOptions {
  url: string;
  data?: Record<string, any> | null;
  method?: Method;
  success?: (response: AxiosResponse) => void;
  fail?: (error: AxiosError) => void;
}

export const request = async ({ url, data = null, method = "get", success = () => {}, fail = () => {} }: RequestOptions): Promise<void> => {
  try {
    let response: AxiosResponse;

    switch (method) {
      case "PATCH":
        response = await api.patch(url, data);
        break;
      case "PUT":
        response = await api.put(url, data);
        break;
      case "DELETE":
        response = await api.delete(url, { data: data });
        break;
      case "POST":
        response = await api.post(url, data);
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
