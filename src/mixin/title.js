/** title mixin
 * used for setting title in each page
 * 
 * ex)
 * <script>
 * export default{
 *   title: " PAGE NAME "
 * }
 * </script>
*/
export default {
  mounted() {
    let { title } = this.$options
    if (title) {
      title = typeof title === 'function' ? title.call(this) : title
      document.title = title
    }
  }
}