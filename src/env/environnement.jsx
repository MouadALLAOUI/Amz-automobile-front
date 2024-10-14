import { STRINGS } from './strings/STRINGS';

export const Lang = STRINGS['EN'];

export const months = [
  Lang.MONTHS.JAN,
  Lang.MONTHS.FEB,
  Lang.MONTHS.MAR,
  Lang.MONTHS.APR,
  Lang.MONTHS.MAY,
  Lang.MONTHS.JUN,
  Lang.MONTHS.JUL,
  Lang.MONTHS.AUG,
  Lang.MONTHS.SEP,
  Lang.MONTHS.OCT,
  Lang.MONTHS.NOV,
  Lang.MONTHS.DEC,
];

// export const FILL_TABLES = (objects = [], wantedHeadCells = []) => {
//   let newRows = [];
//   let newHeadCell = [];

//   const addHeadCell = (id, value) => {
//     if (!newHeadCell.some((cell) => cell.id === id)) {
//       newHeadCell.push({
//         id,
//         numeric: typeof value !== 'string',
//         disablePadding: true,
//         label: id.charAt(0).toUpperCase() + id.slice(1),
//       });
//     }
//   };

//   const processSimpleValue = (key, value, newRow) => {
//     newRow[key] = value;
//     addHeadCell(key, value);
//   };

//   const processObjectValue = (key, value, wantedValue, newRow) => {
//     if (Array.isArray(value) && value[0] && typeof value[0] === 'object') {
//       Object.entries(value[0]).forEach(([nestedKey, nestedValue]) => {
//         if (wantedValue.includes(nestedKey)) {
//           newRow[nestedKey] = nestedValue;
//           addHeadCell(nestedKey, nestedValue);
//         }
//       });
//     } else {
//       console.error('Invalid value passed to processObjectValue:', value);
//     }
//   };

//   objects.forEach((object) => {
//     let newRow = {};
//     Object.entries(object).forEach(([key, value]) => {
//       wantedHeadCells.forEach((wanted) => {
//         if (
//           typeof value !== 'object' &&
//           key === wanted &&
//           typeof wanted !== 'object'
//         ) {
//           processSimpleValue(key, value, newRow);
//         } else if (typeof wanted === 'object' && key === wanted.key) {
//           processObjectValue(key, value, wanted.value, newRow);
//         }
//       });
//     });
//     newRows.push(newRow);
//   });

//   // Flatten wantedHeadCells to a simple array of keys, preserving order
//   const flatWantedHeadCells = wantedHeadCells.flatMap((item) =>
//     typeof item === 'object' ? item.value : item
//   );

//   // Sort the head cells according to flatWantedHeadCells
//   newHeadCell.sort((a, b) => {
//     const aIndex = flatWantedHeadCells.indexOf(a.id);
//     const bIndex = flatWantedHeadCells.indexOf(b.id);
//     return aIndex - bIndex;
//   });

//   // Sort the rows based on the sorted head cells
//   newRows = newRows.map((row) => {
//     const sortedRow = {};
//     newHeadCell.forEach((cell) => {
//       if (row[cell.id] !== undefined) {
//         sortedRow[cell.id] = row[cell.id];
//       }
//     });
//     return sortedRow;
//   });

//   return { newRows, newHeadCell };
// };

export const FILL_TABLES = (objects = [], wantedHeadCells = []) => {
  let newRows = [];
  let newHeadCell = [];

  const addHeadCell = (id, value) => {
    if (!newHeadCell.some((cell) => cell.id === id)) {
      newHeadCell.push({
        id,
        numeric: typeof value !== 'string',
        disablePadding: true,
        label: id.charAt(0).toUpperCase() + id.slice(1),
      });
    }
  };

  const processSimpleValue = (key, value, newRow) => {
    newRow[key] = value !== undefined ? value : ''; // Assign empty string if value is undefined
    addHeadCell(key, value);
  };

  const processObjectValue = (key, value, wantedValue, newRow) => {
    if (Array.isArray(value) && value[0] && typeof value[0] === 'object') {
      Object.entries(value[0]).forEach(([nestedKey, nestedValue]) => {
        if (wantedValue.includes(nestedKey)) {
          newRow[nestedKey] = nestedValue !== undefined ? nestedValue : ''; // Handle undefined values
          addHeadCell(nestedKey, nestedValue);
        }
      });
    } else {
      console.error('Invalid value passed to processObjectValue:', value);
    }
  };

  objects.forEach((object) => {
    let newRow = {};
    Object.entries(object).forEach(([key, value]) => {
      wantedHeadCells.forEach((wanted) => {
        if (
          typeof value !== 'object' &&
          key === wanted &&
          typeof wanted !== 'object'
        ) {
          processSimpleValue(key, value, newRow);
        } else if (typeof wanted === 'object' && key === wanted.key) {
          processObjectValue(key, value, wanted.value, newRow);
        }
      });
    });

    // Ensure all wantedHeadCells are present in the newRow, even if they are missing in the object
    wantedHeadCells.forEach((wanted) => {
      const key = typeof wanted === 'object' ? wanted.value : wanted;
      if (!Object.prototype.hasOwnProperty.call(newRow, key)) {
        newRow[key] = ''; // Initialize missing key with an empty string
      }
    });

    newRows.push(newRow);
  });

  // Flatten wantedHeadCells to a simple array of keys, preserving order
  const flatWantedHeadCells = wantedHeadCells.flatMap((item) =>
    typeof item === 'object' ? item.value : item
  );

  // Sort the head cells according to flatWantedHeadCells
  newHeadCell.sort((a, b) => {
    const aIndex = flatWantedHeadCells.indexOf(a.id);
    const bIndex = flatWantedHeadCells.indexOf(b.id);
    return aIndex - bIndex;
  });

  // Sort the rows based on the sorted head cells
  newRows = newRows.map((row) => {
    const sortedRow = {};
    newHeadCell.forEach((cell) => {
      sortedRow[cell.id] = row[cell.id] !== undefined ? row[cell.id] : ''; // Ensure no missing fields
    });
    return sortedRow;
  });

  return { newRows, newHeadCell };
};


export function SET_TABLES_SETTINGS(settings = {}, mainKeys = 'client', isSimple = true) {
  let wantedCells = ['id'];
  if (isSimple) {
    Object.keys(settings).forEach((label) => {
      Object.entries(settings[`${label}`]).forEach(([key]) => {
        if (settings[`${label}`][`${key}`]) {
          wantedCells.push(key);
        }
      });
    });
    /*[
      {
          "vehicules_immatriculation": "dfg15123",
          "vehicules_kilometrage": 1000,
          "model_id": 1,
          "makes_id": 1,
          "task_title": "sdfsdf",
          "task_description": "sdfdsfdsfdsfdsfdsf",
          "task_status": "pending",
          "assigned_to": 2,
          "created_by": 2
      }
    ]*/
    return wantedCells;
  } else {
    let tasks = [];
    let vehicule = [];
    Object.keys(settings).forEach((label) => {
      Object.entries(settings[`${label}`]).forEach(([key]) => {
        if (label === mainKeys && settings[`${label}`][`${key}`]) {
          wantedCells.push(key);
        } else if (label === 'task' && settings[`${label}`][`${key}`]) {
          tasks.push(key);
        } else if (label === 'vehicule' && settings[`${label}`][`${key}`]) {
          vehicule.push(key);
        }
      });
    });
    wantedCells.push({ key: 'task', value: tasks });
    wantedCells.push({ key: 'vehicule', value: vehicule });
    return wantedCells;
  }
}

const ENVIRONNEMENTS = {
  PROD: {
    API_URL: '',
    BACKEND_URL: '',
  },
  DEV: {
    API_URL: 'http://127.0.0.1:8000/api',
    BACKEND_URL: 'http://127.0.0.1:8000',
  },
};
const APP_ENV = 'DEV';
export function isElectron() {
  // Check if the navigator.userAgent contains 'Electron'
  return (
    typeof navigator === 'object' && navigator.userAgent.includes('Electron')
  );
}

export default function GET_ENV() {
  return ENVIRONNEMENTS[APP_ENV];
}
