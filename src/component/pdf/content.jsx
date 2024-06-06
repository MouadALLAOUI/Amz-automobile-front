import {
  Page,
  View,
  Document,
  Image,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import logo from '../../media/logoAmz.jpeg';

export default function Content() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Fiche De Travail</Text>
        </View>
        <View style={styles.tableHeader}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>VÉHICULE :</Text>
            <Text style={styles.tableCell}>ENTRÉE :</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>IMMATRICULATION :</Text>
            <Text style={styles.tableCell}>SORTIE :</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>KILOMÉTRAGE :</Text>
            <Text style={styles.tableCell}>CLIENT :</Text>
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
            ></Text>
            <Text
              style={{ ...styles.tableCell, width: '70%', minHeight: 200 }}
            ></Text>
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
            ></Text>
          </View>
        </View>
      </Page>
    </Document>
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
