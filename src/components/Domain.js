import React, { useContext, useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Accordion, Button, Checkbox, Divider, Grid, Header, Icon, Input, Popup, Segment } from 'semantic-ui-react'

import { AppContext } from '../AppContext'
import { APP, DOMAIN, DOMAIN_TABLE } from '../enums'
import DomainTable from './DomainTable'
import ErrorMessage from './ErrorMessage'
import { truncateString } from '../utilities/Common'

function Domain ({ domainIndex }) {
  const context = useContext(AppContext)
  const language = context.language
  const domain = context.schemas[domainIndex].$ref.replace('#/definitions/', '')

  const [{ data, loading, error }, refetch] = useAxios(`${context.backend}/${domain}`)

  const [tableHeaders, setTableHeaders] = useState(DOMAIN_TABLE.DEFAULT_TABLE_HEADERS)
  const [truncationLength, setTruncationLength] = useState(200 / tableHeaders.length)
  const [tableColumns, setTableColumns] = useState([])
  const [tableData, setTableData] = useState([])
  const [accordionOpen, setAccordionOpen] = useState(false)

  useEffect(() => {
    setTableHeaders(DOMAIN_TABLE.DEFAULT_TABLE_HEADERS)
  }, [domainIndex])

  useEffect(() => {
    if (data !== undefined) {
      const tableDataTest = data.map(item => {
        const dataEntry = {}

        for (let key in item) {
          if (typeof item[key] !== 'string') {
            if (Array.isArray(item[key]) && !item[key].every(value => typeof value === 'string')) {
              const nameObject = item[key].find(object => object.languageCode === language)

              // TODO: This needs to handle other object types than MultilingualText
              dataEntry[key] = `${nameObject === undefined ?
                item[key][0].languageText === undefined ?
                  'UNABLE TO COMPUTE'
                  : item[key][0].languageText
                : nameObject.languageText}`
            } else {
              dataEntry[key] = item[key].toString()
            }
          } else {
            dataEntry[key] = item[key]
          }
        }

        return dataEntry
      })

      setTableData(tableDataTest)
    }
  }, [data, language])

  useEffect(() => {
    setTableColumns(tableHeaders.map(header => ({
      accessor: header,
      Cell: props => header === 'id' ?
        <a href={props.original.id}>{props.value}</a>
        :
        Array.isArray(props.value) ?
          <Popup basic flowing trigger={
            <div>{props.value.map(value => <p key={value}>{truncateString(value, truncationLength)}</p>)}</div>
          }>
            <div>{props.value.map(value => <p key={value}>{value}</p>)}</div>
          </Popup>
          :
          props.value !== undefined ?
            props.value.length > truncationLength ?
              <Popup basic flowing trigger={<div>{truncateString(props.value, truncationLength)}</div>}>
                {props.value}
              </Popup>
              :
              props.value
            :
            ''
      ,
      Header: context.schemas[domainIndex].definitions[domain].properties[header].displayName,
      headerStyle: { fontWeight: '700' },
      Filter: ({ filter, onChange }) => (
        <Input
          onChange={e => onChange(e.target.value)}
          value={filter ? filter.value : ''}
          placeholder={APP.SEARCH[language]}
          fluid
        />
      )
    })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, tableHeaders])

  return (
    <>
      <Header as='h1' icon={{ name: 'table', color: 'teal' }} dividing
              content={context.schemas[domainIndex].definitions[domain].displayName}
              subheader={context.schemas[domainIndex].definitions[domain].description}
      />
      {error && <ErrorMessage error={error} />}
      <Grid columns='equal'>
        <Grid.Column verticalAlign='middle'>
          <Popup basic flowing trigger={<Icon link size='large' name='sync' color='blue' onClick={refetch} />}>
            <Icon color='blue' name='info circle' />
            {DOMAIN.REFRESH_DOMAIN_LIST[language]}
          </Popup>
          <Icon disabled name='hashtag' color='teal' />
          {tableData.length}
        </Grid.Column>
        <Grid.Column>
          <Button animated primary floated='right' disabled={loading}>
            <Button.Content visible>
              {`${APP.ADD_NEW[language]} ${domain}`}
            </Button.Content>
            <Button.Content hidden>
              <Icon fitted name='pencil alternate' />
            </Button.Content>
          </Button>
        </Grid.Column>
      </Grid>
      <Accordion>
        <Accordion.Title active={accordionOpen} onClick={() => setAccordionOpen(!accordionOpen)}>
          <Icon name='dropdown' />
          {DOMAIN.ADJUST_TABLE_HEADERS[language]}
        </Accordion.Title>
        <Accordion.Content active={accordionOpen}>
          <Segment>
            <Button icon='undo' floated='right' color='teal'
                    onClick={() => setTableHeaders(DOMAIN_TABLE.DEFAULT_TABLE_HEADERS)}
            />
            <Grid columns='equal' divided>
              {['common', 'unique', 'autofilled'].map(grouping =>
                <Grid.Column key={grouping}>
                  {Object.keys(context.uiSchemas[domainIndex][grouping]).map(attribute =>
                    <Checkbox key={attribute} label={context.uiSchemas[domainIndex][grouping][attribute].displayName}
                              checked={tableHeaders.includes(attribute)} style={{ marginRight: '0.5em' }}
                              onClick={() => {
                                if (tableHeaders.includes(attribute)) {
                                  setTableHeaders(tableHeaders.filter(element => element !== attribute))
                                  setTruncationLength(200 / tableHeaders.filter(element => element !== attribute).length)
                                } else {
                                  const newTableHeaders = tableHeaders.map(attribute => attribute)

                                  newTableHeaders.push(attribute)

                                  setTableHeaders(newTableHeaders)
                                  setTruncationLength(200 / newTableHeaders.length)
                                }
                              }}
                    />
                  )}
                </Grid.Column>
              )}
            </Grid>
          </Segment>
          <Divider hidden style={{ marginBottom: 0 }} />
        </Accordion.Content>
      </Accordion>
      <DomainTable data={tableData} columns={tableColumns} loading={loading} />
    </>
  )
}

export default Domain
