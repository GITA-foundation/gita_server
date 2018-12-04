(function($) {

  // link The Module Pattern
  // https://learn.jquery.com/code-organization/concepts/
  var member = (function() {

    // Private variables
    var deleteMemberElement = '#deleteMember';
    var memberId = $("#userId").val();

    // Private functions
    var deleteMember = function(e) {
      e.preventDefault();
      var memberId = $(e.target).attr('alt');
      if (!memberId) return

      $.ajax({
        url: "/api/user/" + memberId,
        type: 'DELETE',
        data: null,
        success: function(result) {
          alert('刪除成功');
          window.location = "/admin/members";
        },
        error: function() {
          alert('請再試一次');
        }
      });
    }

    var updateMember = function(e) {
      e.preventDefault();
      $.ajax({
        url: "/admin/member-detail/"+memberId,
        type: 'PUT',
        data: $('[name=memberDetail]').serialize(),
        success: function(result) {
          alert("Update successed");
          window.location = "/admin/member-detail/"+memberId;
        },
        error: function(e) {
          if (e.readyState === 4 && e.status === 200) {
            alert("Update successed");
          } else {
            alert('Please try again.');
          }
        }
      });
    }

    $("select[name=status]").on('change', function(e) {
      const identity = $(this).data('identity');
      const path = `/admin/project/status/${identity}`;

      $.ajax({
        type: "PUT",
        url: path,
        data: 'status=' + this.value,
        success: function(result) {
          window.location.reload();
        }
      });

    });

    $(".btn-group.btn-group-switch").click(function() {
      const identity = $(this).data('identity');
      const shouldBeVerifed = $(this).find( "label:first" ).hasClass('active');
      const type = shouldBeVerifed ? 'verify' : 'unverify';
      const path = `/admin/project/${type}/${identity}`;
      $.ajax({
        type: "PUT",
        url: path,
        success: function(result) {
          window.location.reload();
        }
      });
    });

    // Public API
    return {
      init: function() {
        $(deleteMemberElement).on('click', deleteMember);
        $("form").on('submit', updateMember);
      }
    };
  })();

  member.init();

}(jQuery));
