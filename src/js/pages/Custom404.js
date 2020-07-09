import React from "react";


const Custom404 = () => {
    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    };
    return (
        <div style={styles}>
          <div>
            <h1>404:<br/> The page you're looking for cannot be found</h1>
            <br/><a href="/dashboard">Back to dashboard</a>
          </div>
          
        </div>
    );
}

export default Custom404;

    
