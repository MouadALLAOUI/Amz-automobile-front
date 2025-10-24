import {
  Page,
  View,
  // Document,
  Image,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import logo from '../../media/logoAmz.jpeg';

export default function Content({ vehicule = {} }) {
  // {
  //   "id": 1,
  //   "entree": "2024-10-15 15:39:00",
  //   "sortie": null,
  //   "details": "TEST the car",
  //   "vehicule_id": 1,
  //   "task_id": "TASK-001",
  //   "vehicule": "Alhambra (Seat)",
  //   "immatriculation": "CAR-REF-2001",
  //   "kilometrage": "1500",
  //   "name": "MOUAD",
  //   "description": null,
  //   "tps": null,
  //   "operations_realisees": null,
  //   "observations": null
  // }
  // console.log(vehicule); //! vehicule
  return (

    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={logo} style={styles.logo} />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Fiche De Travail</Text>
      </View>
      <View style={styles.tableHeader}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>VÉHICULE : {vehicule.vehicule}</Text>
          <Text style={styles.tableCell}>ENTRÉE : {vehicule.entree}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>IMMATRICULATION : {vehicule.immatriculation}</Text>
          <Text style={styles.tableCell}>SORTIE : {vehicule.sortie}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>KILOMÉTRAGE : {vehicule.kilometrage}</Text>
          <Text style={styles.tableCell}>CLIENT : {vehicule.name}</Text>
        </View>
      </View>
      <View style={styles.tableBody}>
        <View style={styles.tableRow}>
          <Text style={{ ...styles.tableCellBold, width: '30%' }}>TPS</Text>
          <Text style={{ ...styles.tableCellBold, width: '70%' }}>
            OPÉRATIONS RÉALISÉES
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={{ ...styles.tableCell, width: '30%', minHeight: 200 }}
          >{vehicule.tps}</Text>
          <Text
            style={{ ...styles.tableCell, width: '70%', minHeight: 200 }}
          >{vehicule.operations_realisees}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={{ ...styles.tableCellBold, width: '30%' }}></Text>
          <Text style={{ ...styles.tableCellBold, width: '70%' }}>
            OBSERVATIONS
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={{ ...styles.tableCell, width: '30%', minHeight: 150 }}
          ></Text>
          <Text
            style={{ ...styles.tableCell, width: '70%', minHeight: 150 }}
          >{vehicule.observations}</Text>
        </View>
      </View>
    </Page>
  );
}
Font.register({
  family: 'abeezee',
  src: 'http://fonts.gstatic.com/s/abeezee/v9/JYPhMn-3Xw-JGuyB-fEdNA.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFF',
    fontFamily: 'abeezee',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 200,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableHeader: {
    marginBottom: 20,
  },
  tableBody: {
    marginBottom: 20,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableCell: {
    width: '50%',
    fontSize: 12,
    padding: 5,
    border: '1px solid #000',
  },
  tableCellBold: {
    border: '1px solid #000',
    width: '50%',
    fontSize: 16,
    padding: 5,
  },
});
