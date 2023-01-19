import React from 'react'
import fetch from 'cross-fetch'
import {List, ListItem} from '@chakra-ui/react'
import Link from '../../components/link'

const ContentSearch = ({contentResult, error}) => {
    if (error) {
        return <div>{error.fault.message}</div>
    }
    if (!contentResult) {
        return <div>Loading...</div>
    } else {
        const {hits = []} = contentResult
        return (
            <div>
                <h1>SearchResults</h1>
                {hits.length ? (
                    <List>
                        {hits.map(({id, name}) => (
                            <ListItem key={id}>
                                <Link to={`/content/${id}`}>{name}</Link>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <div>NoContentItemsFound!</div>
                )}
            </div>
        )
    }
}

ContentSearch.getProps = async () => {
    let contentResult
    let error
    const res = await fetch(
        'http://localhost:3000/mobify/proxy/ocapi/s/RefArch/dw/shop/v20_2/content_search?q=about&client_id=1d763261-6522-4913-9d52-5d947d3b94c4'
    )

    if (res.ok) {
        contentResult = await res.json()
    } else {
        error = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return {
        contentResult,
        error
    }
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch
