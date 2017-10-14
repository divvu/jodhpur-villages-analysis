(function() {
  var slice = [].slice;

  function queue(parallelism) {
    var q,
        tasks = [],
        started = 0, // number of tasks that have been started (and perhaps finished)
        active = 0, // number of tasks currently being executed (started but not finished)
        remaining = 0, // number of tasks not yet finished
        popping, // inside a synchronous task callback?
        error = null,
        await = noop,
        all;

    if (!parallelism) parallelism = Infinity;

    function pop() {
      while (popping = started < tasks.length && active < parallelism) {
        var i = started++,
            t = tasks[i],
            a = slice.call(t, 1);
        a.push(callback(i));
        ++active;
        t[0].apply(null, a);
      }
    }

    function callback(i) {
      return function(e, r) {
        --active;
        if (error != null) return;
        if (e != null) {
          error = e; // ignore new tasks and squelch active callbacks
          started = remaining = NaN; // stop queued tasks from starting
          notify();
        } else {
          tasks[i] = r;
          if (--remaining) popping || pop();
          else notify();
        }
      };
    }

    function notify() {
      if (error != null) await(error);
      else if (all) await(error, tasks);
      else await.apply(null, [error].concat(tasks));
    }

    return q = {
      defer: function() {
        if (!error) {
          tasks.push(arguments);
          ++remaining;
          pop();
        }
        return q;
      },
      await: function(f) {
        await = f;
        all = false;
        if (!remaining) notify();
        return q;
      },
      awaitAll: function(f) {
        await = f;
        all = true;
        if (!remaining) notify();
        return q;
      }
    };
  }

  function noop() {}

  queue.version = "1.0.7";
  if (typeof define === "function" && define.amd) define(function() { return queue; });
  else if (typeof module === "object" && module.exports) module.exports = queue;
  else this.queue = queue;
})();
var _$_b69c=["\x72\x67\x62\x28\x32\x35\x35\x2C\x32\x35\x35\x2C\x32\x30\x34\x29","\x72\x67\x62\x28\x31\x36\x31\x2C\x32\x31\x38\x2C\x31\x38\x30\x29","\x72\x67\x62\x28\x36\x35\x2C\x31\x38\x32\x2C\x31\x39\x36\x29","\x72\x67\x62\x28\x33\x34\x2C\x39\x34\x2C\x31\x36\x38\x29","\x23\x66\x31\x65\x65\x66\x36","\x23\x62\x64\x63\x39\x65\x31","\x23\x37\x34\x61\x39\x63\x66","\x23\x30\x35\x37\x30\x62\x30","\x72\x61\x6E\x67\x65","\x6F\x72\x64\x69\x6E\x61\x6C","\x73\x63\x61\x6C\x65","\x23\x30\x30\x30","\x61\x77\x61\x69\x74","\x6A\x73\x6F\x6E","\x6A\x73\x2F\x6A\x6F\x64\x68\x70\x75\x72\x5F\x76\x69\x6C\x6C\x5F\x61\x6E\x61\x6C\x79\x73\x69\x73\x5F\x6C\x61\x73\x74\x2E\x6A\x73\x6F\x6E","\x64\x65\x66\x65\x72","\x56\x5F\x43\x54\x5F\x43\x4F\x44\x45","\x66\x6F\x72\x45\x61\x63\x68","\x6D\x61\x72\x6B\x65\x72\x2D\x73\x65\x6C\x65\x63\x74","\x47\x45\x4F","\x56\x49\x4C\x4C\x5F\x4E\x41\x4D\x45","\x6C\x6F\x67","\x64\x69\x6D\x65\x6E\x73\x69\x6F\x6E","\x72\x65\x64\x75\x63\x65\x43\x6F\x75\x6E\x74","\x67\x72\x6F\x75\x70","\x41\x52\x45\x41","\x54\x5F\x50","\x54\x5F\x4D","\x54\x5F\x66","\x53\x43\x5F\x50","\x53\x43\x5F\x4D","\x53\x43\x5F\x46","\x53\x54\x5F\x50","\x53\x54\x5F\x4D","\x53\x54\x5F\x46","\x53\x5F\x53\x5F\x53\x43\x48","\x45\x44\x55\x5F\x46\x41\x43","\x53\x54\x5F\x43\x4F\x44\x45","\x53\x5F\x52\x5F\x47\x72\x61\x64\x65","\x4D\x45\x44\x49\x5F\x46\x41\x43","\x43\x55\x4C\x54\x5F\x57\x41\x53\x54\x45","\x55\x4E\x5F\x49\x52\x52","\x41\x52\x45\x41\x5F\x4E\x41\x5F\x43\x55","\x54\x4F\x54\x5F\x49\x52\x52","\x54\x41\x50","\x43\x41\x54\x45\x47\x4F\x52\x59","\x67\x72\x6F\x75\x70\x41\x6C\x6C","\x72\x65\x64\x75\x63\x65\x53\x75\x6D","\x2C","\x62\x6F\x74\x74\x6F\x6D","\x74\x6F\x70","\x23\x70\x6F\x70\x75\x6C\x61\x74\x69\x6F\x6E\x2D\x63\x68\x61\x72\x74","\x62\x61\x72\x43\x68\x61\x72\x74","\x23\x73\x65\x78\x2D\x72\x61\x74\x69\x6F\x2D\x63\x68\x61\x72\x74","\x72\x6F\x77\x43\x68\x61\x72\x74","\x23\x65\x64\x75\x63\x61\x74\x69\x6F\x6E\x2D\x63\x68\x61\x72\x74","\x70\x69\x65\x43\x68\x61\x72\x74","\x23\x6D\x65\x64\x69\x63\x61\x6C\x2D\x66\x61\x63\x2D\x63\x68\x61\x72\x74","\x23\x74\x6F\x74\x61\x6C\x2D\x76\x69\x6C\x6C\x61\x67\x65\x73","\x6E\x75\x6D\x62\x65\x72\x44\x69\x73\x70\x6C\x61\x79","\x23\x74\x6F\x74\x61\x6C\x2D\x70\x6F\x70\x75\x6C\x61\x74\x69\x6F\x6E","\x23\x6D\x65\x6E\x75\x73\x65\x6C\x65\x63\x74","\x73\x65\x6C\x65\x63\x74\x4D\x65\x6E\x75","\x23\x72\x6F\x77\x2D\x73\x65\x6C\x65\x63\x74\x69\x6F\x6E","\x64\x61\x74\x61\x43\x6F\x75\x6E\x74","\x76\x61\x6C\x75\x65\x41\x63\x63\x65\x73\x73\x6F\x72","\x64","\x66\x6F\x72\x6D\x61\x74","\x66\x6F\x72\x6D\x61\x74\x4E\x75\x6D\x62\x65\x72","\x73","\x74\x69\x63\x6B\x46\x6F\x72\x6D\x61\x74","\x79\x41\x78\x69\x73","\x76\x61\x6C\x75\x65","\x6F\x72\x64\x65\x72\x69\x6E\x67","\x72\x65\x6E\x64\x65\x72\x56\x65\x72\x74\x69\x63\x61\x6C\x47\x72\x69\x64\x4C\x69\x6E\x65\x73","\x72\x65\x6E\x64\x65\x72\x48\x6F\x72\x69\x7A\x6F\x6E\x74\x61\x6C\x47\x72\x69\x64\x4C\x69\x6E\x65\x73","\x76\x69\x6C\x6C\x61\x67\x65\x73","\x78\x41\x78\x69\x73\x4C\x61\x62\x65\x6C","\x75\x6E\x69\x74\x73","\x78\x55\x6E\x69\x74\x73","\x64\x6F\x6D\x61\x69\x6E","\x78","\x65\x6C\x61\x73\x74\x69\x63\x59","\x67\x61\x70","\x63\x65\x6E\x74\x65\x72\x42\x61\x72","\x6D\x61\x72\x67\x69\x6E\x73","\x74\x72\x61\x6E\x73\x69\x74\x69\x6F\x6E\x44\x75\x72\x61\x74\x69\x6F\x6E","\x68\x65\x69\x67\x68\x74","\x77\x69\x64\x74\x68","\x74\x69\x63\x6B\x73","\x78\x41\x78\x69\x73","\x69\x6E\x6E\x65\x72\x52\x61\x64\x69\x75\x73","\x72\x61\x64\x69\x75\x73","\x72\x65\x64\x75\x63\x65","\x65\x6E\x74\x72\x69\x65\x73","\x6D\x61\x70","\x63\x6F\x6C\x6F\x72\x73","\x6B\x65\x79","\x64\x61\x74\x61","\x20","\x65\x6E\x64\x41\x6E\x67\x6C\x65","\x73\x74\x61\x72\x74\x41\x6E\x67\x6C\x65","\x50\x49","\x70\x72\x69\x6E\x74\x53\x69\x6E\x67\x6C\x65\x56\x61\x6C\x75\x65","\x75\x74\x69\x6C\x73","\x25","\x74\x65\x78\x74","\x74\x65\x78\x74\x2E\x70\x69\x65\x2D\x73\x6C\x69\x63\x65","\x73\x65\x6C\x65\x63\x74\x41\x6C\x6C","\x72\x65\x6E\x64\x65\x72\x6C\x65\x74","\x23\x72\x65\x73\x6F\x75\x72\x63\x65\x2D\x63\x68\x61\x72\x74","\x66\x69\x6C\x74\x65\x72","\x6C\x65\x6E\x67\x74\x68","\x3C\x68\x34\x3E\x20\x43\x61\x74\x65\x67\x6F\x72\x79\x3A\x20","\x3C\x2F\x68\x34\x3E\x20","\x56\x69\x6C\x6C\x61\x67\x65\x3A\x20","\x3C\x62\x72\x3E","\x41\x72\x65\x61\x3A\x20","\x50\x6F\x77\x65\x72\x20\x53\x75\x70\x70\x6C\x79\x3A\x20","\x50\x4F\x57\x45\x52\x5F\x53\x55\x50\x4C","\x43\x6F\x6D\x6D\x75\x6E\x69\x63\x61\x74\x69\x6F\x6E\x20\x46\x61\x63\x2E\x3A\x20","\x43\x4F\x4D\x4D\x5F\x46\x41\x43","\x42\x61\x6E\x6B\x20\x46\x61\x63\x2E\x3A\x20","\x42\x41\x4E\x4B\x5F\x46\x41\x43","\x70\x6F\x70\x75\x70","\x72\x65\x6E\x64\x65\x72\x54\x69\x74\x6C\x65","\x63\x6C\x75\x73\x74\x65\x72","\x70\x6F\x70\x75\x70\x4F\x6E\x48\x6F\x76\x65\x72","\x66\x69\x74\x4F\x6E\x52\x65\x64\x72\x61\x77","\x66\x69\x74\x4F\x6E\x52\x65\x6E\x64\x65\x72","\x23\x6D\x61\x70\x2D\x63\x61\x6E\x76\x61\x73","\x6C\x65\x61\x66\x6C\x65\x74\x4D\x61\x72\x6B\x65\x72\x43\x68\x61\x72\x74","\x23\x63\x61\x74\x65\x67\x6F\x72\x79\x2D\x63\x68\x61\x72\x74","\x72\x65\x6E\x64\x65\x72\x41\x6C\x6C"];var colorbrewer=[_$_b69c[0],_$_b69c[1],_$_b69c[2],_$_b69c[3]];var colorScale=d3[_$_b69c[10]][_$_b69c[9]]()[_$_b69c[8]]([_$_b69c[4],_$_b69c[5],_$_b69c[6],_$_b69c[7]]);var colorScale1=d3[_$_b69c[10]][_$_b69c[9]]()[_$_b69c[8]]([_$_b69c[11],_$_b69c[6],_$_b69c[7]]);queue()[_$_b69c[15]](d3[_$_b69c[13]],_$_b69c[14])[_$_b69c[12]](makeGraphs);function makeGraphs(_0x619F,_0x61E3){var _0x615B=_0x61E3;_0x615B[_$_b69c[17]](function(_0x65BD){_0x65BD[_$_b69c[16]]=  +_0x65BD[_$_b69c[16]]});var _0x629E=crossfilter(_0x615B);var _0x61D2=_$_b69c[18];var _0x61B0=_0x629E[_$_b69c[22]](function(_0x65BD){if(_0x65BD[_$_b69c[19]]){return _0x65BD[_$_b69c[19]]}else {console[_$_b69c[21]](_0x65BD[_$_b69c[20]])}});var _0x61C1=_0x61B0[_$_b69c[24]]()[_$_b69c[23]]();var _0x658A=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[20]]});var _0x6579=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[16]]});var _0x6106=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[25]]});var _0x6458=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[26]]});var _0x6469=_0x629E[_$_b69c[22]](function(_0x65BD){return (_0x65BD[_$_b69c[27]]/ _0x65BD[_$_b69c[28]])});var _0x63BF=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[29]]});var _0x63D0=_0x629E[_$_b69c[22]](function(_0x65BD){return (_0x65BD[_$_b69c[30]]/ _0x65BD[_$_b69c[31]])* 100});var _0x6436=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[32]]});var _0x6447=_0x629E[_$_b69c[22]](function(_0x65BD){return (_0x65BD[_$_b69c[33]]/ _0x65BD[_$_b69c[34]])* 100});var _0x63AE=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[35]]});var _0x617D=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[36]]});var _0x6414=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[37]]});var _0x639D=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[38]]});var _0x6249=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[39]]});var _0x614A=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[40]]});var _0x6557=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[41]]});var _0x6117=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[42]]});var _0x649C=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[43]]});var _0x647A=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[44]]});var _0x6128=_0x629E[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[45]]});var _0x6337=_0x6128[_$_b69c[24]]();var _0x637B=_0x6458[_$_b69c[24]]();var _0x636A=_0x639D[_$_b69c[24]]();var _0x6348=_0x617D[_$_b69c[24]]();var _0x6359=_0x6249[_$_b69c[24]]();var _0x659B=_0x658A[_$_b69c[24]]();var _0x6425=_0x6414[_$_b69c[24]]();var _0x64AD=_0x649C[_$_b69c[24]]();var _0x6568=_0x6557[_$_b69c[24]]();var _0x648B=_0x647A[_$_b69c[24]]();var _0x60F5=_0x629E[_$_b69c[46]]();var _0x64F1=_0x658A[_$_b69c[24]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[26]]});var _0x6513=_0x658A[_$_b69c[24]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[43]]});var _0x6524=_0x658A[_$_b69c[24]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[41]]});var _0x64CF=_0x658A[_$_b69c[24]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[40]]});var _0x64BE=_0x658A[_$_b69c[24]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[42]]});var _0x6502=_0x648B[_$_b69c[23]](function(_0x65BD){return _0x65BD[_$_b69c[20]]});var _0x6304=_0x629E[_$_b69c[46]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[26]]});var _0x62F3=_0x629E[_$_b69c[46]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[43]]});var _0x6315=_0x629E[_$_b69c[46]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[41]]});var _0x62E2=_0x629E[_$_b69c[46]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[44]]});var _0x62D1=_0x629E[_$_b69c[46]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[40]]});var _0x62C0=_0x629E[_$_b69c[46]]()[_$_b69c[47]](function(_0x65BD){return _0x65BD[_$_b69c[42]]});var _0x65AC=crossfilter(_0x615B);var _0x628D=_0x65AC[_$_b69c[22]](function(_0x65BD){return _0x65BD[_$_b69c[43]]+ _$_b69c[48]+ _0x65BD[_$_b69c[41]]+ _$_b69c[48]+ _0x65BD[_$_b69c[40]]+ _$_b69c[48]+ _0x65BD[_$_b69c[42]]});var _0x6205=_0x628D[_$_b69c[24]]()[_$_b69c[47]](function(_0x65BD){return _0x658A});var _0x627C=_0x658A[_$_b69c[49]](1)[0][_$_b69c[20]];var _0x6238=_0x658A[_$_b69c[50]](1)[0][_$_b69c[20]];var _0x626B=_0x6458[_$_b69c[49]](1)[0][_$_b69c[26]];var _0x6227=_0x6458[_$_b69c[50]](1)[0][_$_b69c[26]];console[_$_b69c[21]](_0x648B);console[_$_b69c[21]](_0x62E2);var _0x6326=dc[_$_b69c[52]](_$_b69c[51]);var _0x63E1=dc[_$_b69c[54]](_$_b69c[53]);var _0x618E=dc[_$_b69c[56]](_$_b69c[55]);var _0x625A=dc[_$_b69c[54]](_$_b69c[57]);var _0x6535=dc[_$_b69c[59]](_$_b69c[58]);var _0x64E0=dc[_$_b69c[59]](_$_b69c[60]);selectField= dc[_$_b69c[62]](_$_b69c[61])[_$_b69c[22]](_0x6414)[_$_b69c[24]](_0x6425);dc[_$_b69c[64]](_$_b69c[63])[_$_b69c[22]](_0x629E)[_$_b69c[24]](_0x60F5);_0x6535[_$_b69c[68]](d3[_$_b69c[67]](_$_b69c[66]))[_$_b69c[65]](function(_0x65BD){return _0x65BD})[_$_b69c[24]](_0x60F5);_0x64E0[_$_b69c[68]](d3[_$_b69c[67]](_$_b69c[66]))[_$_b69c[65]](function(_0x65BD){return _0x65BD})[_$_b69c[24]](_0x6304)[_$_b69c[68]](d3[_$_b69c[67]](_$_b69c[66]));_0x6326[_$_b69c[88]](40000)[_$_b69c[87]](220)[_$_b69c[86]](1000)[_$_b69c[22]](_0x658A)[_$_b69c[24]](_0x64F1)[_$_b69c[85]]({top:10,right:50,bottom:60,left:19720})[_$_b69c[84]](false)[_$_b69c[83]](2)[_$_b69c[82]](true)[_$_b69c[81]](d3[_$_b69c[10]][_$_b69c[9]]()[_$_b69c[80]](_0x658A))[_$_b69c[79]](dc[_$_b69c[78]][_$_b69c[9]])[_$_b69c[77]](_$_b69c[76])[_$_b69c[75]](true)[_$_b69c[74]](true)[_$_b69c[73]](function(_0x65BD){return _0x65BD[_$_b69c[72]]})[_$_b69c[71]]()[_$_b69c[70]](d3[_$_b69c[67]](_$_b69c[69]));_0x625A[_$_b69c[87]](220)[_$_b69c[22]](_0x6249)[_$_b69c[24]](_0x6359)[_$_b69c[90]]()[_$_b69c[89]](4);_0x63E1[_$_b69c[87]](220)[_$_b69c[22]](_0x639D)[_$_b69c[24]](_0x636A)[_$_b69c[90]]()[_$_b69c[89]](4);_0x618E[_$_b69c[87]](230)[_$_b69c[92]](90)[_$_b69c[91]](40)[_$_b69c[86]](1000)[_$_b69c[22]](_0x617D)[_$_b69c[24]](_0x6348);var _0x61F4=_0x61E3;var _0x62AF=crossfilter(_0x61F4);function _0x638C(_0x616C,_0x6612){var _0x6601=_0x616C[_$_b69c[46]]()[_$_b69c[93]](function(_0x6623,_0x6634){_0x6612[_$_b69c[17]](function(_0x6645){_0x6623[_0x6645]+= _0x6634[_0x6645]});return _0x6623},function(_0x6623,_0x6634){_0x6612[_$_b69c[17]](function(_0x6645){_0x6623[_0x6645]-= _0x6634[_0x6645]});return _0x6623},function(){var _0x6623={};_0x6612[_$_b69c[17]](function(_0x6645){_0x6623[_0x6645]= 0});return _0x6623});return {all:function(){return d3[_$_b69c[95]](_0x6601[_$_b69c[72]]())[_$_b69c[94]]()}}}var _0x616C=_0x629E[_$_b69c[22]](function(_0x65CE){return _0x65CE[_$_b69c[43]]});var _0x63F2=_0x638C(_0x616C,[_$_b69c[43],_$_b69c[41],_$_b69c[40],_$_b69c[42]]);var _0x6546=_0x629E[_$_b69c[22]](function(_0x65CE){return _0x65CE[_$_b69c[20]]});var _0x6403=dc[_$_b69c[56]](_$_b69c[110])[_$_b69c[88]](300)[_$_b69c[87]](230)[_$_b69c[22]](_0x6546)[_$_b69c[92]](90)[_$_b69c[24]](_0x63F2)[_$_b69c[86]](1000)[_$_b69c[109]](function(_0x65DF){_0x65DF[_$_b69c[108]](_$_b69c[107])[_$_b69c[106]](function(_0x65BD){return _0x65BD[_$_b69c[98]][_$_b69c[97]]+ _$_b69c[99]+ dc[_$_b69c[104]][_$_b69c[103]]((_0x65BD[_$_b69c[100]]- _0x65BD[_$_b69c[101]])/ (2* Math[_$_b69c[102]])* 100)+ _$_b69c[105]})})[_$_b69c[96]](colorScale);_0x6403[_$_b69c[111]]= function(){};var _0x6216=dc[_$_b69c[131]](_$_b69c[130])[_$_b69c[22]](_0x61B0)[_$_b69c[24]](_0x61C1)[_$_b69c[88]](420)[_$_b69c[87]](488)[_$_b69c[129]](true)[_$_b69c[128]](true)[_$_b69c[127]](true)[_$_b69c[126]](true)[_$_b69c[125]](true)[_$_b69c[124]](function(_0x65BD){for(var _0x65F0=_0x615B[_$_b69c[112]]- 1;_0x65F0>= 0;_0x65F0--){if(_0x615B[_0x65F0][_$_b69c[19]]== _0x65BD[_$_b69c[97]]){return _$_b69c[113]+ _0x615B[_0x65F0][_$_b69c[45]]+ _$_b69c[114]+ _$_b69c[115]+ _0x615B[_0x65F0][_$_b69c[20]]+ _$_b69c[116]+ _$_b69c[117]+ _0x615B[_0x65F0][_$_b69c[25]]+ _$_b69c[116]+ _$_b69c[118]+ _0x615B[_0x65F0][_$_b69c[119]]+ _$_b69c[116]+ _$_b69c[120]+ _0x615B[_0x65F0][_$_b69c[121]]+ _$_b69c[116]+ _$_b69c[122]+ _0x615B[_0x65F0][_$_b69c[123]]}}});var _0x6139=dc[_$_b69c[54]](_$_b69c[132])[_$_b69c[22]](_0x6128)[_$_b69c[24]](_0x6337)[_$_b69c[87]](200)[_$_b69c[90]]()[_$_b69c[89]](4);dc[_$_b69c[133]]()}