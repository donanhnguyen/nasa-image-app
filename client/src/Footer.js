

function Footer () {

    const d = new Date();
    let year = d.getFullYear();

    return (
        <div className="footer">
            <p>Copyright GalaxyStays {year}</p>
        </div>
    )
}

export default Footer;