import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

interface UserChatInterface {
  id: string; // chat id
  user: string; // chat user id
  lastMessage?: {
    id: string;
    createdAt: string; //timestamp
    text: string;
    user: string; // message creator's id
  };
  lastUpdate: string;
  displayed: boolean;
  chatRef: string;
}

export const fetchUserChats = createAsyncThunk(
  'chats/fetchUserChat',
  (querySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
    const list: UserChatInterface[] = [];
    querySnapshot.docs.forEach(documentSnapshot => {
      // data inside the User -> Chat doc
      const {id, user, lastMessage, lastUpdate, displayed} =
        documentSnapshot.data();
      const chatRef = documentSnapshot.id;

      if (lastMessage) {
        lastMessage.createdAt = lastMessage.createdAt.toDate().toTimeString();
        list.push({
          id,
          user,
          lastMessage,
          lastUpdate: lastUpdate.toDate().toTimeString(),
          chatRef,
          displayed,
        });
      } else {
        // fresh chats don't have lastMessage object
        list.push({
          id,
          user,
          lastUpdate: lastUpdate.toDate().toTimeString(),
          chatRef,
          displayed,
        });
      }
    });
    return list;
  },
);

interface ChatsState {
  status: 'idle' | 'loading' | 'success' | 'failed';
  chatsList: UserChatInterface[];
}

const initialState = {
  status: 'idle',
  chatsList: [],
} as ChatsState;

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserChats.fulfilled, (state, action) => {
      state.status = 'success';
      state.chatsList = action.payload;
    });
  },
});

export default chatsSlice;
