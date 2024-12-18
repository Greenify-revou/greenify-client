
  
const Card = ({ title, value, color }: { title: string; value: string | number; color: string }) => (
    <div
      className="p-6 bg-[#34495E] rounded-lg shadow-lg hover:bg-[#3A4B60] transition duration-300"
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div className="text-lg font-medium text-white">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
  
  export default Card;
  