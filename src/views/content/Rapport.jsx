import { useEffect, useState } from 'react';
import { Button } from '@mui/joy';
import MyResponsiveBar from '../../component/chart/chart';
import { months } from '../../env/environnement';

const data_handdle = (numbers) => {
  const data = [];

  months.forEach((element, index) => {
    if (numbers[index] !== undefined) {
      data.push({
        id: index + 1,
        months: element,
        entrees: numbers[index],
      });
    } else {
      data.push({
        id: index + 1,
        months: element,
        entrees: 0,
      });
    }
  });
  return data;
};

export default function Rapport() {
  const [medicamentsget, setMedicamentsget] = useState('BMW');
  const [dateget, setDateget] = useState('2024');
  const [data, setData] = useState([]);
  const entrees = [4];
  useEffect(() => {
    setMedicamentsget('BMW');
    setDateget('2024');
    const processedData = data_handdle(entrees);
    setData(processedData);
  }, []);
  return (
    <div className="Rapport-views">
      <div className="option-rapport">
        <Button
          color="neutral"
          onClick={function () {}}
          size="lg"
          sx={{ bgcolor: '#000' }}
        >
          CONFIGURATION
        </Button>
      </div>
      <div className="option-rapport">
        <p className="desc">
          Variation de “<span className="tasks-name">{medicamentsget}</span>” en
          fonction des Quantité <span className="tasks-name">{dateget}</span>
        </p>
      </div>
      <div className="option-rapport table-tasks-rapport">
        <MyResponsiveBar data={data} keys={['entrees']} indexBy="months" />
      </div>
    </div>
  );
}
