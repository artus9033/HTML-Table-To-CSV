function DataEnc(a) {
    this.config(a);
}
DataEnc._enctype = {
        u8    : ['u8', 'utf8'],
        u16be : ['u16', 'u16be', 'utf16', 'utf16be', 'ucs2', 'ucs2be'],
        u16le : ['u16le', 'utf16le', 'ucs2le']
};
DataEnc._BOM = {
        'none'     : '',
        'UTF-8'    : '%ef%bb%bf',
        'UTF-16BE' : '%fe%ff',
        'UTF-16LE' : '%ff%fe'
};
DataEnc.prototype = {
    config : function(a) {
        var opt = {
            charset: 'u8',
            mime   : 'text/csv',
            base64 : 0,
            bom    : 0
        }, p;
        a = a || {};
        for (p in opt) {
            if (opt.hasOwnProperty(p))
                this[p] = a.hasOwnProperty(p) ? a[p] : opt[p];
        }
        this.buf  = '';
        this.lead = '';
        this.__intro();
        return this;
    },
    __intro : function() {
        var
            g = [],
            c = this.charset || '',
            b = 'none'
        ;
        if (this.mime && this.mime !== '')
            g.push(this.mime);
        if (c !== '') {
            c = c.replace(/[-\s]/g, '').toLowerCase();
            if (DataEnc._enctype.u8.indexOf(c) > -1) {
                c = 'UTF-8';
                if (this.bom)
                    b = c;
                this.enc = this.utf8;
            } else if (DataEnc._enctype.u16be.indexOf(c) > -1) {
                c = 'UTF-16BE';
                if (this.bom)
                    b = c;
                this.enc = this.utf16be;
            } else if (DataEnc._enctype.u16le.indexOf(c) > -1) {
                c = 'UTF-16LE';
                if (this.bom)
                    b = c;
                this.enc = this.utf16le;
            } else {
                if (c === 'copy')
                    c = '';
                this.enc = this.copy;
            }
        }
        if (c !== '')
            g.push('charset=' + c);
        if (this.base64)
            g.push('base64');
        this.lead = 'data:' + g.join(';') + ',' + DataEnc._BOM[b];
        return this;
    },
    pay : function() {
        return this.lead + this.buf;
    },
    utf16be : function(t) {
        var i, c, buf = [];
        for (i = 0; i < t.length; ++i) {
            if ((c = t.charCodeAt(i)) > 0xff) {
                buf.push(('0' + (c >> 0x08).toString(16)).substr(-2));
                buf.push(('0' + (c  & 0xff).toString(16)).substr(-2));
            } else {
                buf.push('00');
                buf.push(('0' + (c  & 0xff).toString(16)).substr(-2));
            }
        }
        this.buf += '%' + buf.join('%');
        return buf;
    },
    utf16le : function(t) {
        var i, c, buf = [];
        for (i = 0; i < t.length; ++i) {
            if ((c = t.charCodeAt(i)) > 0xff) {
                buf.push(('0' + (c  & 0xff).toString(16)).substr(-2));
                buf.push(('0' + (c >> 0x08).toString(16)).substr(-2));
            } else {
                buf.push(('0' + (c  & 0xff).toString(16)).substr(-2));
                buf.push('00');
            }
        }
        this.buf += '%' + buf.join('%');
        return buf;
    },
    utf8 : function(t) {
        this.buf += encodeURIComponent(t);
        return this;
    },
    copy : function(t) {
        this.buf += t;
        return this;
    }
};
