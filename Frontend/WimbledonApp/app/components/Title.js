import React from 'react';
import AppText from './AppText';

function Title({children, numberOfLines = 2}) {
    return (
        <AppText numberOfLines={numberOfLines} style={{fontWeight: "bold", fontSize: 20}}>
            {children}
        </AppText>
    );
}

export default Title;