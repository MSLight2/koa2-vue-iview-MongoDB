<template>
  <div id="newsletter" class="section">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="newsletter">
            <p>登录参与 <strong>NEWSLETTER</strong></p>
            <form @submit.prevent>
              <input class="input" type="email" placeholder="邮件地址">
              <button class="newsletter-btn"><i class="fa fa-envelope"></i> 发送</button>
            </form>
            <ul class="newsletter-follow">
              <li>
                <a href="javascript:;"><i class="fa fa-facebook"></i></a>
              </li>
              <li>
                <a href="javascript:;"><i class="fa fa-twitter"></i></a>
              </li>
              <li>
                <a href="javascript:;"><i class="fa fa-instagram"></i></a>
              </li>
              <li>
                <a href="javascript:;"><i class="fa fa-pinterest"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
  .newsletter form .newsletter-btn{
    vertical-align: top;
  }
</style>
