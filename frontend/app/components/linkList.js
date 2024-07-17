import LinkEdit from "./linkEdit";

export default function LinkList({ data }) {
  return (
    <div className="table-row-group overflow-scroll">
      {data.results.map((link) => {
        return <LinkEdit key={link.id} id={link.id} location={link.link} />;
      })}
    </div>
  );
}
