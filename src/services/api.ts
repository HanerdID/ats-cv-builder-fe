import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface ResumeData {
  title: string;
  template: string;
  content: Record<string, unknown>;
  // Tambahkan properti lain sesuai kebutuhan
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const { data } = await api.post("/auth/refresh-token");
        localStorage.setItem("token", data.token);

        // Retry the original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, redirect to login
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API Service methods
const apiService = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) =>
      api.post("/auth/login", { email, password }),
    register: (userData: UserData) => api.post("/auth/register", userData),
    logout: () => api.post("/auth/logout"),
    refreshToken: () => api.post("/auth/refresh-token"),
    forgotPassword: (email: string) =>
      api.post("/auth/forgot-password", { email }),
    resetPassword: (token: string, password: string) =>
      api.post("/auth/reset-password", { token, password }),
    verifyEmail: (token: string) => api.get(`/auth/verify-email/${token}`),
  },

  // User endpoints
  user: {
    getProfile: () => api.get("/users/me"),
    updateProfile: (userData: Partial<UserData>) =>
      api.put("/users/me", userData),
    updatePassword: (currentPassword: string, newPassword: string) =>
      api.put("/users/password", { currentPassword, newPassword }),
    uploadAvatar: (formData: FormData) =>
      api.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  },

  // Resume endpoints
  resume: {
    getAll: () => api.get("/resumes"),
    getById: (id: string) => api.get(`/resumes/${id}`),
    create: (resumeData: ResumeData) => api.post("/resumes", resumeData),
    update: (id: string, resumeData: Partial<ResumeData>) =>
      api.put(`/resumes/${id}`, resumeData),
    delete: (id: string) => api.delete(`/resumes/${id}`),
    analyzeATS: (id: string, jobDescription: string) =>
      api.post(`/resumes/${id}/analyze-ats`, { jobDescription }),
    duplicate: (id: string) => api.post(`/resumes/${id}/duplicate`),
    getPreview: (id: string) => api.get(`/resumes/${id}/preview`),
    exportPdf: (id: string) =>
      api.get(`/resumes/${id}/export/pdf`, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      }),

    exportDocx: (id: string) =>
      api.get(`/resumes/${id}/export/docx`, {
        responseType: "blob",
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      }),

    exportTxt: (id: string) =>
      api.get(`/resumes/${id}/export/txt`, {
        responseType: "blob",
        headers: {
          Accept: "text/plain",
        },
      }),
  },
};

export default apiService;
