import React, { useContext } from 'react'
import ReactTable from 'react-table'

import { AppContext } from '../AppContext'
import { DOMAIN_TABLE } from '../enums'

function DomainTable ({ columns, data, loading }) {
  const language = useContext(AppContext).language

  const filterMethod = (filter, row) => {
    const id = filter.pivotId || filter.id

    return row[id] !== undefined && typeof row[id] === 'string' ?
      String(row[id].toLowerCase()).includes(filter.value.toLowerCase()) : true
  }

  return (
    <ReactTable
      className='-highlight'
      sortable
      filterable
      defaultFilterMethod={filterMethod}
      resizable={false}
      data={data}
      columns={columns}
      loading={loading}
      defaultPageSize={20}
      noDataText={DOMAIN_TABLE.NOTHING_FOUND[language]}
      previousText={DOMAIN_TABLE.PREVIOUS[language]}
      nextText={DOMAIN_TABLE.NEXT[language]}
      ofText={DOMAIN_TABLE.OF[language]}
      pageText={DOMAIN_TABLE.PAGE[language]}
      loadingText={DOMAIN_TABLE.LOADING[language]}
      rowsText={DOMAIN_TABLE.ROWS[language]}
    />
  )
}

export default DomainTable
