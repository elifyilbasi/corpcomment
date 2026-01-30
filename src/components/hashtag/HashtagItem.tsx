type HashtagItemProps = {
  company: string;
  handleSelectedCompany: (company: string) => void;
};
export default function HashtagItem({
  company,
  handleSelectedCompany,
}: HashtagItemProps) {
  return (
    <li key={company}>
      <button onClick={() => handleSelectedCompany(company)}>#{company}</button>
    </li>
  );
}
