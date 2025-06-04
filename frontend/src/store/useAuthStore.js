import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    // Check if user is authenticated
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.error("Error in check auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // Signup
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account Created Successfully");
            get().connectSocket();
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    // Logout
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out Successfully");
            get().disconnectSocket();
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    },

    // Login
    login: async (data) => {
        set({ isLoggingIng: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged In Successfully");
            get().connectSocket();
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIng: false });
        }
    },

    //Update Profile
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.error("Update Profile error:", error);
            toast.error(error?.response?.data?.message || "Update Profile failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    //Connect Socket
    connectSocket: async () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            auth: {
                userId: authUser._id,
            },
        });

        socket.connect();
        set({socket:socket});

        socket.on("getOnlineUsers",(userIds) => {
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket: async () => { 
        if(get().socket?.connected) get().socket.disconnect();
    },
}));
