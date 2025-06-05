import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    //Get User
    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    //Get messages
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    //Send Messages
sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const authUser = useAuthStore.getState().authUser;
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
        // Append sent message locally to improve UX
        set({
            messages: [...get().messages, res.data],
        });
    } catch (error) {
        toast.error(error.response.data.message);
    }
},

subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;

    socket.on("newMessage", (newMessage) => {
        // Check if the new message belongs to the current conversation
        const isRelevantMessage =
            (newMessage.senderId === selectedUser._id && newMessage.receiverId === authUser._id) ||
            (newMessage.senderId === authUser._id && newMessage.receiverId === selectedUser._id);

        if (!isRelevantMessage) return;

        // Prevent duplicate messages by checking if message already exists
        const existingMessages = get().messages;
        const isDuplicate = existingMessages.some(msg => msg._id === newMessage._id);
        if (isDuplicate) return;

        set({
            messages: [...existingMessages, newMessage],
        });
    });
},

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
    },


    //Set Selected User
    setSelectedUser: (selectedUser) => set({ selectedUser }),

}));