import React from 'react';
import AppText from './AppText';

function Subtitle({children, numberOfLines = 2}) {
    return (
        <AppText numberOfLines={numberOfLines} style={{fontSize: 15, textAlign: 'justify', fontWeight: "300"}}>
            {children}
        </AppText>
    );
}

export default Subtitle;