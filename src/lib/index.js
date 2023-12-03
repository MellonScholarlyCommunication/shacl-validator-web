// place files you want to import through the `$lib` alias in this folder.
import factory from 'rdf-ext';
import rdfParser from 'rdf-parse';
import rdfSerializer from 'rdf-serialize';
import stringifyStream from 'stream-to-string';
import SHACLValidator from 'rdf-validate-shacl';
import Streamify from 'streamify-string';

async function loadDataset (dataStr,type) {
    const sm = Streamify(dataStr);
    return factory.dataset().import(
      rdfParser.parse(sm, { contentType: type })
    );
}

export async function validateString(dataStr) {
    try {
        const res = await fetch('eventnotifications.ttl');
        const SHAPE_FILE = await res.text();
        const shapes = await loadDataset(SHAPE_FILE,'text/turtle');
        const data = await loadDataset(dataStr,'application/ld+json');
        const validator = new SHACLValidator(shapes, { factory });
        const report = await validator.validate(data);
        const quadStream = report.dataset.toStream();
        const textStream = rdfSerializer.serialize(quadStream, { contentType: 'text/turtle' });
        return await stringifyStream(textStream);
    }
    catch (e) {
        console.log(e);
        return `failed: ${e}`;
    }
}