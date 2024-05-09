import { FormLabel } from './form';

export const Label = ({
  title,
  mode,
}: {
  title: string;
  mode: 'light' | 'dark';
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}
    >
      <FormLabel mode={mode}>{title}</FormLabel>
    </div>
  );
};
