import axios from "axios";
import create from "zustand";

interface Item {
  created_at: string;
  id: number;
  name: string;
}

interface ItemStore {
  isLoading: boolean;
  tags:
    | {
        key: string[];
      }
    | {};
  items: Item[] | [];
  getData: () => void;
  addTag: (id, tag) => void;
  removeTag: (id, index) => void;
  setTags: (tags) => void;
  getTagsFromLocalStore: () => void;
  updateLocalTagStore: (tags) => void;
}

const API: string = "https://my.api.mockaroo.com/movies.json?key=bf3c1c60";

const dataStore = create<ItemStore>((set, get) => ({
  isLoading: false,
  tags: {},
  items: [],
  getTagsFromLocalStore: () => {
    const data = localStorage.getItem("tags");
    if (!data) return {};
    set({ tags: JSON.parse(data) });
  },
  updateLocalTagStore: (tags: object) => {
    localStorage.setItem("tags", JSON.stringify(tags));
  },
  setTags: (tags) => {},
  addTag: (id, tag) => {
    const tags = get().tags;
    const item = tags[id];
    if (item) {
      set({ tags: { ...tags, [id]: item.concat([tag]) } });
    } else {
      set({ tags: { ...tags, [id]: [tag] } });
    }
    get().updateLocalTagStore(get().tags);
  },
  removeTag: (id, value) => {
    const tags = get().tags;
    const item = tags[id];
    set({ tags: { ...tags, [id]: item.filter((tag) => tag !== value) } });
    get().updateLocalTagStore(get().tags);
  },
  getData: async () => {
    try {
      set({ isLoading: true });
      const data = await axios.get(API);
      set({ isLoading: false, items: data.data });
    } catch (e) {
      set({ items: [] });
    }
  },
}));

export default dataStore;
