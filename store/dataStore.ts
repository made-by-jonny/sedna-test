import axios from "axios";
import create from "zustand";

export interface Item {
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
  filteredItems: Item[] | [];
  getData: () => void;
  addTag: (id: string | number, tag: string) => void;
  removeTag: (id: string | number, value: string) => void;
  getTagsFromLocalStore: () => void;
  updateLocalTagStore: (tags: object) => void;
  filterItems: (query: string) => void;
}

const API: string = "https://my.api.mockaroo.com/movies.json?key=bf3c1c60";

const dataStore = create<ItemStore>((set, get) => ({
  isLoading: false,
  tags: {},
  items: [],
  filteredItems: [],
  filterItems: (value: string) => {
    const tags = get().tags;
    if (value.length === 0) return set({ filteredItems: [] });

    const filteredItems = Object.keys(tags).reduce((total, id) => {
      const tag = tags[id];
      if (tag.includes(value)) {
        const item = get().items.find((item: Item) => item.id === parseInt(id));
        total.push(item);
      }
      return total;
    }, []);

    set({ filteredItems });
  },
  getTagsFromLocalStore: () => {
    const data = localStorage.getItem("tags");
    if (!data) return {};
    set({ tags: JSON.parse(data) });
  },
  updateLocalTagStore: (tags: object) => {
    localStorage.setItem("tags", JSON.stringify(tags));
  },
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
  removeTag: (id, index) => {
    const tags = get().tags;
    const item = tags[id];
    item.splice(index, 1);
    set({ tags: { ...tags, [id]: item } });
    get().updateLocalTagStore(get().tags);
  },
  getData: async () => {
    try {
      set({ isLoading: true });
      const data = await axios.get(API);
      set({
        isLoading: false,
        items: data.data,
      });
    } catch (e) {
      set({
        items: [],
        isLoading: false,
      });
    }
  },
}));

export default dataStore;
