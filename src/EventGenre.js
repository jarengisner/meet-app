import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  const colors = [
    '#05386B',
    '#6B0B05',
    '#6B5805',
    '#6B6705',
    '#446B05',
    '#056B0B',
    '#050B6B',
  ];

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  //Filters our event descriptions to count how many events that we have depending on the description//

  function getData() {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = events.filter(({ summary }) =>
        summary.split(' ').includes(genre)
      ).length;
      return { name: genre, value };
    });
    return data;
  }

  //returns what we will render into our application//
  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          dataKey='value'
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((dataEntry, indexOfEntry) => {
            <Cell key={`cell-${indexOfEntry}`} fill={colors[indexOfEntry]} />;
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
