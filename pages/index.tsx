import { useEffect } from "react";
import dataStore from "../store/dataStore";
import styled from "styled-components";

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: row;
  align-items: center;
`;

const Pill = styled.li`
  background: #e87648;
  border-radius: 100px;
  display: flex;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: center;
  color: #fff;
  button {
    margin-left: 1rem;
  }
`;

const FlexList = styled.ul`
  all: unset;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;

const Index = () => {
  const { items, getData, tags, addTag, removeTag, getTagsFromLocalStore } =
    dataStore((state) => ({
      items: state.items,
      getData: state.getData,
      addTag: state.addTag,
      removeTag: state.removeTag,
      tags: state.tags,
      getTagsFromLocalStore: state.getTagsFromLocalStore,
    }));

  useEffect(() => {
    getTagsFromLocalStore();
    (async () => await getData())();
  }, []);

  return (
    <>
      <input />
      {items.map((item) => (
        <ListItem>
          <section>
            <h2>{item.name}</h2>
            <span>{item.created_at}</span>
          </section>
          <section
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                console.log(parseInt(e.target["max-tag"].value));
                if (parseInt(e.target["max-tag"].value) <= 4) {
                  addTag(e.target.id.value, e.target.tag.value);
                } else {
                  alert("max tags per items is 5");
                }
              }}
            >
              <input type="hidden" name="id" value={item.id} />
              <input
                type="hidden"
                name="max-tag"
                value={(tags?.[item.id] || []).length}
              />
              <input name="tag" placeholder="add tag" required />
              <button type="submit">add tag</button>
            </form>
            <FlexList>
              {(tags?.[item.id] || []).map((tag, index) => (
                <Pill>
                  <span></span>
                  {tag}{" "}
                  <form
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      removeTag(e.target.id.value, e.target.tag.value);
                    }}
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="tag" value={tag} />
                    <button type="submit">x</button>
                  </form>
                </Pill>
              ))}
            </FlexList>
          </section>
        </ListItem>
      ))}
    </>
  );
};

export default Index;
