/* eslint-disable */
import { useState } from 'react';
import {
  Table,
  Box,
  Typography,
  Sheet,
  Checkbox,
  FormControl,
  FormLabel,
  Button,
  Link,
  Select,
  Option,
} from '@mui/joy';

function My_Table({
  rows = [],
  headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
  ],
  order = 'asc',
  orderBy = 'name',
  selected = [],
  page = 0,
  rowsPerPage = 5,
  isCheckBox = true,
  isAction = true,
  setOrder = () => { },
  setOrderBy = () => { },
  setSelected = () => { },
  setPage = () => { },
  setRowsPerPage = () => { },
  hanndleFilter = () => { },
  onDeleteClick = () => { },
  onEditClick = () => { },
}) {
  const PageNumberLabel = () => {
    const to = () =>
      rowsPerPage === -1
        ? rows.length
        : Math.min(rows.length, (page + 1) * rowsPerPage);
    const from = () => (rows.length === 0 ? 0 : page * rowsPerPage + 1);
    const count = () => (rows.length === -1 ? -1 : rows.length);

    return `${count() !== -1 ? count() : `more than ${to()}`
      } of ${to()}–${from()}`;
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    return array.slice().sort((a, b) => {
      const order = comparator(a, b);
      return order !== 0 ? order : a.index - b.index;
    });
  };

  const TableHead = ({
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  }) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <thead>
        <tr>
          {isCheckBox && (
            <th
              style={{
                width: 45,
                zIndex: 1001,
                textAlign: 'center',
              }}>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                slotProps={{
                  input: {
                    'aria-label': 'select all desserts',
                  },
                }}
              />
            </th>
          )}
          {headCells.map((headCell) => {
            const active = orderBy === headCell.id;
            return (
              <th
                style={{
                  width: headCell.id == 'id' ? 45 : undefined,
                  zIndex: isCheckBox !== true && headCell.id == 'id' ? 1000 : undefined,
                  textAlign: 'center',
                }}
                key={headCell.id}
                aria-sort={
                  active
                    ? { asc: 'ascending', desc: 'descending' }[order]
                    : undefined
                }
              >
                <Link
                  underline="none"
                  color="neutral"
                  textColor={active ? 'primary.plainColor' : undefined}
                  component="button"
                  onClick={createSortHandler(headCell.id)}
                  fontWeight="lg"
                  startDecorator={
                    headCell.numeric && active ? (
                      order === 'desc' ? (
                        <i className="fa-solid fa-arrow-down-big-small"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-down-small-big"></i>
                      )
                    ) : null
                  }
                  endDecorator={
                    !headCell.numeric && active ? (
                      order === 'desc' ? (
                        <i className="fa-solid fa-arrow-down-big-small"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-down-small-big"></i>
                      )
                    ) : null
                  }
                >
                  {headCell.label}
                </Link>
              </th>
            );
          })}
          {isAction && (
            <th
              aria-label="last"
              style={{
                width: 200,
                textAlign: 'center',
              }}
            >
              Action
            </th>
          )}
        </tr>
      </thead>
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n[`${headCells[0].id}`]);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Sheet
      variant="outlined"
      sx={{
        boxShadow: 'lg',
        borderRadius: 'lg',
        overflow: 'auto',
        maxHeight: '63vh',
        width: '100%',
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        hoverRow
        color="neutral"
        size="lg"
        stickyFooter
        stickyHeader
        stripe="odd"
        variant="soft"
        borderAxis="bothBetween"
        sx={{
          'thead th': {
            width: 300,
          },
          '& tr > *:first-of-type': {
            position: 'sticky',
            left: 0,
            boxShadow: '3px 0 #EEE6',
          },
          '& tr > *:last-child': {
            position: 'sticky',
            right: 0,
          },
        }}
      >
        <TableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <tbody>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isCheckBox && isSelected(row[`${headCells[0].id}`]);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row[`${headCells[0].id}`]}
                  style={
                    isItemSelected
                      ? {
                        '--TableCell-dataBackground':
                          'var(--TableCell-selectedBackground)',
                        '--TableCell-headBackground':
                          'var(--TableCell-selectedBackground)',
                      }
                      : {}
                  }
                >
                  {isCheckBox && (
                    <td
                      scope="row"
                      style={{
                        textAlign: 'center',
                        background: '#FFE',
                      }}
                      onClick={(event) => isCheckBox && handleClick(event, row[`${headCells[0].id}`])}
                      className="cell"
                    >
                      <Checkbox
                        checked={isItemSelected}
                        slotProps={{ input: { 'aria-labelledby': labelId } }}
                        sx={{ verticalAlign: 'top' }}
                      />
                    </td>
                  )}
                  {Object.entries(row).map(([key, value]) => (
                    <td
                      id={labelId}
                      style={{
                        textAlign: isCheckBox !== true && key === 'id' ? 'center' : undefined,
                        background: isCheckBox !== true && key === 'id' ? '#FFE' : undefined,
                      }}
                      scope="row"
                      key={key}
                      onClick={(event) => isCheckBox && handleClick(event, row[`${headCells[0].id}`])}
                      className="cell"
                    >
                      {value}
                    </td>
                  ))}
                  {isAction && (
                    <th
                      scope="row"
                      style={{ textAlign: 'center', background: '#FFE' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <Button size="sm" variant="soft" color="warning" onClick={() => onEditClick(row.id, row.task_status)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="solid"
                          color="danger"
                          onClick={() => onDeleteClick(row.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </th>
                  )}
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr style={{ height: `calc(2 * 6vh)` }}>
              <td
                colSpan={
                  headCells.length + (isCheckBox ? 1 : 0) + (isAction ? 1 : 0)
                }
                aria-hidden
              >
                empty
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div
        style={{
          position: 'sticky',
          left: 0,
          bottom: 0,
          width: '100%',
          background: '#FFF',
          padding: 15,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          <FormControl orientation="horizontal" size="sm">
            <FormLabel>Rows per page:</FormLabel>
            <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
              <Option value={5}>5</Option>
              <Option value={10}>10</Option>
              <Option value={25}>25</Option>
              <Option value={50}>50</Option>
            </Select>
          </FormControl>
          <Typography textAlign="center" sx={{ minWidth: 80 }}>
            {PageNumberLabel()}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="sm"
              color="neutral"
              variant="outlined"
              disabled={page === 0}
              onClick={() => handleChangePage(page - 1)}
              sx={{ bgcolor: 'background.surface' }}
            >
              <i className="fa-sharp fa-solid fa-hand-point-left"></i>
            </Button>
            <Button
              size="sm"
              color="neutral"
              variant="outlined"
              disabled={
                rows.length !== -1
                  ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                  : false
              }
              onClick={() => handleChangePage(page + 1)}
              sx={{ bgcolor: 'background.surface' }}
            >
              <i className="fa-sharp fa-solid fa-hand-point-right"></i>
            </Button>
          </Box>
        </Box>
      </div>
    </Sheet>
  );
}

export default My_Table;
