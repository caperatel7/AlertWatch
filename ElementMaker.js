import React from 'react';

// Create an ElementMaker Component
function ElementMaker (props) {
    return (
        // Render a spam element
        <span>
            {
                // Use JS's ternary operatory to specify <span>'s inner content 
                props.showInputEle ?(
                <input
                    type='text'
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    autoFocus
                
                />
                ):(
                <span 
                    onDoubleClick={props.handleDoubleClick}
                    style={{
                        display:"inline-block",
                        height: '25px',
                        minWidth: '300px',
                    }}
                >
                    {props.value}
                    </span>

                )

            }

        </span>
    )
}

export default ElementMaker;