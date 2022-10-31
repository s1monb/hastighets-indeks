interface IProps {
  page: {
    id: number;
    score: number;
  };
}

export default function DetailsView({}: IProps) {
  return <div>This is the single view</div>;
}
