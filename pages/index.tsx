import { useEffect } from "react";
import dataStore from "../store/dataStore";
import styled from "styled-components";
import LineItem, { ListContainer } from "../components/lineItem";
import Header from "../components/primatives/containers/header";
import Label from "../components/primatives/form/label";
import Input from "../components/primatives/form/input";

const PageContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Index = () => {
  const {
    items,
    getData,
    tags,
    addTag,
    removeTag,
    filterItems,
    getTagsFromLocalStore,
    filteredItems,
    isLoading,
  } = dataStore((state) => ({
    items: state.items,
    isLoading: state.isLoading,
    getData: state.getData,
    addTag: state.addTag,
    removeTag: state.removeTag,
    tags: state.tags,
    filterItems: state.filterItems,
    filteredItems: state.filteredItems,
    getTagsFromLocalStore: state.getTagsFromLocalStore,
  }));

  useEffect(() => {
    getTagsFromLocalStore();
    (async () => await getData())();
  }, []);

  const addTagSubmission = (e: any) => {
    e.preventDefault();
    if (parseInt(e.target["max-tag"].value) <= 4) {
      addTag(e.target.id.value, e.target.tag.value);
    } else {
      alert("max tags per items is 5");
    }
  };

  const removeTagSubmission = (e: any) => {
    e.preventDefault();
    removeTag(e.target.id.value, e.target.tag.value);
  };

  const queryIems = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterItems(e.target.value);
  };

  return (
    <PageContainer>
      <Header>
        <Label addTags="searchTags">Search Tags</Label>
        <Input id="searchTags" onChange={queryIems} placeholder="search tags" />
      </Header>
      {!isLoading && items.length === 0 ? (
        <h2 className="error">There was a problem loading data from the api</h2>
      ) : null}
      <ListContainer>
        {(filteredItems.length === 0 ? items : filteredItems).map((item) => (
          <LineItem
            key={item.id}
            item={item}
            tags={tags}
            removeTagSubmission={removeTagSubmission}
            addTagSubmission={addTagSubmission}
          />
        ))}
      </ListContainer>
    </PageContainer>
  );
};

export default Index;
