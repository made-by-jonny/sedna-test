import styled from "styled-components";

const Wrapper = styled.li`
  background: #257fff;
  border-radius: 100px;
  display: flex;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem 0.2rem 1rem;
  align-items: center;
  justify-content: center;
  color: #fff;
  button {
    background: none;
    border: 0;
    color: #fff;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
    }
  }
`;

interface Pill {
  id: number;
  tag: string;
  index: number;
  removeTagSubmission: (e) => void;
}

const Pill: React.FC<Pill> = (props) => {
  const { id, tag, index, removeTagSubmission } = props;
  return (
    <Wrapper>
      <span>{tag}</span>
      <form onSubmit={removeTagSubmission}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="tag" value={index} />
        <button type="submit">
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </form>
    </Wrapper>
  );
};

export default Pill;
