
export async function serverRequests(method, location, details) {
    
    if (method == 'GET') {
        try {
            const fetchResponse = await fetch(`http://localhost:3000/${location}`)
            if (fetchResponse.ok) {
                const data = await fetchResponse.json();
                return data;
            } else {
                console.error('Failed:', fetchResponse.statusText);
            }
        } catch (e) {
            return e;
        }
    }
    
    const settings = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
    };
    
    try {
        const fetchResponse = await fetch(`http://localhost:3000/${location}`, settings);
        if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            return data;
        } else {
            console.error('Failed:', fetchResponse.statusText);
        }
    } catch (e) {
        return e;
    }
}