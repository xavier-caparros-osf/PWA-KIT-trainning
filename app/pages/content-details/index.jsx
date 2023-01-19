import React from 'react'
import fetch from 'cross-fetch'
import PropTypes from 'prop-types'

const ContentDetails = ({contentResult}) => {
    if (!contentResult) {
        return <div>Loading...</div>
    }
    return <div dangerouslySetInnerHTML={{__html: contentResult.c_body}} />
}
ContentDetails.getProps = async ({params}) => {
    let contentResult
    const result = await fetch(
        `http://localhost:3000/mobify/proxy/ocapi/s/RefArch/dw/shop/v20_2/content/${params.id}?client_id=1d763261-6522-4913-9d52-5d947d3b94c4`
    )
    if (result.ok) {
        contentResult = await result.json()
    } else {
        const error = await result.json()
        console.log(result.status, error.fault.message)
    }
    return {contentResult}
}

ContentDetails.propTypes = {
    contentResult: PropTypes.object
}

ContentDetails.getTemplateName = () => 'content-details'
export default ContentDetails
