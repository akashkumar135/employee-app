def validate_postal_code_for_country(country: str | None, postal_code: str | None):

    if not country or not postal_code:
        return

    country = country.strip().upper()

    n = len(postal_code)

    if country in ("US", "USA") and n != 5:
        raise ValueError("US ZIP codes must be exactly 5 digits")

    elif country == "IN" and n != 6:
        raise ValueError("Indian PIN codes must be exactly 6 digits")
