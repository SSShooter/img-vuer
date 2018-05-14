// alloy的补间函数
var To = function(el, property, value, time, ease, onEnd, onChange) {
  var current = el[property]
  var dv = value - current
  var beginTime = new Date()
  var self = this
  var currentEase =
    ease ||
    function(a) {
      return a
    }
  this.tickID = null
  var toTick = function() {
    var dt = new Date() - beginTime
    if (dt >= time) {
      el[property] = value
      onChange && onChange(value)
      onEnd && onEnd(value)
      cancelAnimationFrame(self.tickID)
      self.toTick = null
      return
    }
    el[property] = dv * currentEase(dt / time) + current
    self.tickID = requestAnimationFrame(toTick)
    onChange && onChange(el[property])
  }
  toTick()
  To.List.push(this)
}

To.List = []

To.stopAll = function() {
  for (var i = 0, len = To.List.length; i < len; i++) {
    cancelAnimationFrame(To.List[i].tickID)
  }
  To.List.length = 0
}

To.stop = function(to) {
  cancelAnimationFrame(to.tickID)
}

export default To
