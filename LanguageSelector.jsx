export default function LanguageSelector({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="ur">Urdu</option>
      <option value="ar">Arabic</option>
      <option value="fr">French</option>
      <option value="zh">Chinese</option>
    </select>
  );
}
