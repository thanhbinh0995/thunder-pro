import Path from 'path';
import HTTPStatus from 'http-status';

export default class WebAppController {
    index(req, res) {
        const publicUrl = process.env.PUBLIC_URL || 'dist';
        return res
            .status(HTTPStatus.OK)
            .sendFile(Path.join(`${__dirname}/../../client/${publicUrl}/index.html`));
    };
}