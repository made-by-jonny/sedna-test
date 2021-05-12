import styled from "styled-components";
import dayjs from "dayjs";
import { Item } from "../../store/dataStore";
import Row from "../primatives/containers/row";
import Button from "../primatives/form/button";
import Input from "../primatives/form/input";
import Pill from "../pill";
import Label from "../primatives/form/label";

export const ListContainer = styled.ul`
  padding: 0;
  margin: 0 1rem;
  border-radius: 1rem;
  background: #fff;
`;

const Wrapper = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  &:last-of-type {
    border-bottom: 0;
  }
  .controls {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
  .detail {
    span {
      font-size: 0.8rem;
    }
  }

  form {
    display: flex;
  }
`;

interface LineItem {
  item: Item;
  tags: object;
  addTagSubmission: (e) => void;
  removeTagSubmission: (e) => void;
}

const LineItem: React.FC<LineItem> = (props) => {
  const { item, tags, addTagSubmission, removeTagSubmission } = props;
  return (
    <Wrapper>
      <section className="detail">
        <h2>{item.name}</h2>
        <span>{dayjs(item.created_at).format("YYYY-MM-DD")}</span>
      </section>
      <section className="controls">
        <form onSubmit={addTagSubmission}>
          <input type="hidden" name="id" value={item.id} />
          <input
            type="hidden"
            name="max-tag"
            value={(tags?.[item.id] || []).length}
          />
          <Label htmlFor="addTags">add Tags</Label>
          <Input id="addTags" name="tag" placeholder="add tag" required />
          <Button type="submit">add tag</Button>
        </form>
        <Row>
          {(tags?.[item.id] || []).map((tag: string, index: number) => (
            <Pill
              removeTagSubmission={removeTagSubmission}
              tag={tag}
              index={index}
              id={item.id}
            />
          ))}
        </Row>
      </section>
    </Wrapper>
  );
};

export default LineItem;
