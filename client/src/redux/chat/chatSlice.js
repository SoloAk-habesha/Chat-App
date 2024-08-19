import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chatData: [],
  messages: [],
  loading: false,
  error: null,
  selectedChat: null,
  unseenMessageCounts: {},
  typingStatus: {},
};

// Fetch chats
export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/chat");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch chat data."
      );
    }
  }
);

// Handle unseen messages
export const handleUnseenMessages = createAsyncThunk(
  "chats/handleUnseenMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/chat/${chatId}/unseenMessages`);
      return { chatId, count: response.data.count };
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch unseen message count."
      );
    }
  }
);

// Update typing status
export const updateTypingStatus = createAsyncThunk(
  "chats/updateTypingStatus",
  async (typingData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/chat/typing", typingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to update typing status."
      );
    }
  }
);

// Fetch messages
export const fetchMessages = createAsyncThunk(
  "chats/fetchMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/chat/${chatId}/messages`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch messages."
      );
    }
  }
);

// Send message
export const sendMessage = createAsyncThunk(
  "chats/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/chat/send", messageData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to send message."
      );
    }
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chatData = action.payload;
        state.loading = false;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload); // Ensure messages are updated
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
